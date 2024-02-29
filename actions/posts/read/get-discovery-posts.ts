import { Post } from "@/types/posts";
import actionError from "@/utils/actions/action-error";
import { ActionResponse } from "@/utils/actions/action-response";
import actionSuccess from "@/utils/actions/action-success";
import shuffle from "@/utils/general/shuffle-array";
import { createClient } from "@/utils/supabase/server";

export type PostsActionResponse = ActionResponse & {
    posts?: Post[];
};

const getDiscoveryPosts = async (): Promise<PostsActionResponse> => {
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
        .from("posts_with_details")
        .select("*, creator:users(*)")
        .not("creator", "in", `(${users.join(",")})`)
        .is("parent_post", null);

    if (postsError) return actionError(actionName, { error: postsError.message });

    // shuffle posts
    const shuffledPosts = shuffle(posts);

    return actionSuccess(actionName, { posts: shuffledPosts }, { logData: false });
};

export default getDiscoveryPosts;
