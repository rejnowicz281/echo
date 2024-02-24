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

    const { data: posts, error } = await supabase
        .from("posts")
        .select("*, creator:users(*)")
        .order("created_at", { ascending: false })
        .is("parent_post", null);

    if (error) return actionError(actionName, error);

    return actionSuccess(actionName, { posts });
};

export default getFeedPosts;
