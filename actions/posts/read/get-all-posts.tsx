import { Posts } from "@/types/posts";
import actionError from "@/utils/actions/action-error";
import { ActionResponse } from "@/utils/actions/action-response";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

export type PostsActionResponse = ActionResponse & {
    posts?: Posts;
};

const getAllPosts = async (): Promise<PostsActionResponse> => {
    const actionName = "getAllPosts";

    const supabase = createClient();

    const { data: posts, error } = await supabase
        .from("posts")
        .select("*, creator: users(*)")
        .order("created_at", { ascending: false });

    if (error) return actionError(actionName, error);

    return actionSuccess(actionName, { posts });
};

export default getAllPosts;
