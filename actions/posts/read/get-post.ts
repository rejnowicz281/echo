import { ActionResponse } from "@/types/action-response";
import { Post } from "@/types/posts";
import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

type PostActionResponse = ActionResponse & {
    post?: Post;
};

const getPost = async (id: string): Promise<PostActionResponse> => {
    const actionName = "getPost";

    const supabase = createClient();

    // get post and first page of replies
    const { data: post, error } = await supabase
        .from("posts_with_details")
        .select("*, creator:users(*)")
        .eq("id", id)
        .single();

    if (error) return actionError(actionName, { error: error.message });

    return actionSuccess(actionName, { post });
};

export default getPost;
