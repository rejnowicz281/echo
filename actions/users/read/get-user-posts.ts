import { POSTS_PER_PAGE } from "@/constants/posts";
import { PostsActionResponse } from "@/types/posts-action-response";
import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

const getUserPosts = async (page = 1, userId: string): Promise<PostsActionResponse> => {
    const actionName = "getUserPosts";

    const supabase = createClient();

    const { data: posts, error } = await supabase
        .from("posts_with_like_id")
        .select("*")
        .eq("creator", userId)
        .is("parent_post", null)
        .order("created_at", { ascending: false })
        .range((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE - 1);

    if (error) return actionError(actionName, { error: error.message });

    const isLastPage = posts.length < POSTS_PER_PAGE;

    return actionSuccess(actionName, { posts, isLastPage }, { logData: false });
};

export default getUserPosts;
