import { POSTS_PER_PAGE } from "@/constants/posts";
import { PostsActionResponse } from "@/types/posts-action-response";
import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

const getDiscoveryPosts = async (page = 1): Promise<PostsActionResponse> => {
    const actionName = "getDiscoveryPosts";

    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return actionError(actionName, { error: "You must be logged in" });

    const { data: friendships, error: friendshipsError } = await supabase
        .from("friendships")
        .select("requester, recipient")
        .or(`requester.eq.${user.id}, recipient.eq.${user.id})`)
        .is("accepted", true)
        .order("created_at", { ascending: false });

    if (friendshipsError) return actionError(actionName, { error: friendshipsError.message });

    const users = friendships.map((friendship) =>
        friendship.requester === user.id ? friendship.recipient : friendship.requester
    );

    users.push(user.id);

    // get posts of everyone except friends and current user
    const { data: posts, error: postsError } = await supabase
        .from("posts_with_like_id")
        .select("*, creator:users(*)")
        .not("creator", "in", `(${users.join(",")})`)
        .is("parent_post", null)
        .order("created_at", { ascending: false })
        .range((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE - 1);

    if (postsError) return actionError(actionName, { error: postsError.message });

    const isLastPage = posts.length < POSTS_PER_PAGE;

    return actionSuccess(actionName, { posts, isLastPage }, { logData: false });
};

export default getDiscoveryPosts;
