import { Post } from "@/types/posts";
import actionError from "@/utils/actions/action-error";
import { ActionResponse } from "@/utils/actions/action-response";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

export type PostActionResponse = ActionResponse & {
    post?: Post;
};

const getPost = async (id: string): Promise<PostActionResponse> => {
    const actionName = "getPost";

    const supabase = createClient();

    // get post that has same id as the one passed in or parent_post
    const { data: posts, error } = await supabase
        .rpc("get_post_details", { post_id: id })
        .select("*, creator:users(*)");

    if (error) return actionError(actionName, error);

    // create a new post object with the post with the same id as the one passed in and a replies array
    const post = posts.find((p) => p.id === id);
    post.replies = posts.filter((p) => p.parent_post === post.id);

    return actionSuccess(actionName, { post });
};

export default getPost;
