import { POSTS_PER_PAGE } from "@/constants/posts";
import { PostsActionResponse } from "@/types/posts-action-response";
import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

const getPostReplies = async (page = 1, id: string): Promise<PostsActionResponse> => {
    const actionName = "getPostReplies";

    const supabase = createClient();

    const { data: replies, error } = await supabase
        .from("posts_with_like_id")
        .select("*, creator:users(*)")
        .eq("parent_post", id)
        .order("created_at", { ascending: false })
        .range((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE - 1);

    if (error) return actionError(actionName, { error: error.message });

    const isLastPage = replies.length < POSTS_PER_PAGE;

    return actionSuccess(actionName, { replies, isLastPage });
};

export default getPostReplies;
