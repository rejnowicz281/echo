import { POSTS_PER_PAGE } from "@/constants/posts";
import { PostsActionResponse } from "@/types/posts-action-response";
import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

const getUserReplies = async (page = 1, id: string): Promise<PostsActionResponse> => {
    const actionName = "getUserReplies";

    const supabase = createClient();

    const { data: posts, error } = await supabase
        .from("posts_with_details")
        .select("*, creator:users(*)")
        .not("parent_post", "is", null)
        .eq("creator", id)
        .order("created_at", { ascending: false })
        .range((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE - 1);

    if (error) return actionError(actionName, { error: error.message });

    const isLastPage = posts.length < POSTS_PER_PAGE;

    return actionSuccess(actionName, { posts, isLastPage });
};

export default getUserReplies;
