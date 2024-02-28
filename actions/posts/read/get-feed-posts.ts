import { Post } from "@/types/posts";
import actionError from "@/utils/actions/action-error";
import { ActionResponse } from "@/utils/actions/action-response";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

export type PostsActionResponse = ActionResponse & {
    posts?: Post[];
};

const getFeedPosts = async (): Promise<PostsActionResponse> => {
    const actionName = "getFeedPosts";

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

    // get posts of friends and current user
    const { data: posts, error: postsError } = await supabase
        .from("posts_with_details")
        .select("*, creator:users(*)")
        .in("creator", users)
        .is("parent_post", null)
        .order("created_at", { ascending: false });

    if (postsError) return actionError(actionName, { error: postsError.message });

    return actionSuccess(actionName, { posts });
};

export default getFeedPosts;
