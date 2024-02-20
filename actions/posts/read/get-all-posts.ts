import { Post } from "@/types/posts";
import actionError from "@/utils/actions/action-error";
import { ActionResponse } from "@/utils/actions/action-response";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

export type PostsActionResponse = ActionResponse & {
    posts?: Post[];
};

const getAllPosts = async (): Promise<PostsActionResponse> => {
    const actionName = "getAllPosts";

    const supabase = createClient();

    const { data: posts, error } = await supabase.rpc("get_posts_with_reply_count").select("*, creator:users(*)");

    if (error) return actionError(actionName, error);

    return actionSuccess(actionName, { posts });
};

export default getAllPosts;
