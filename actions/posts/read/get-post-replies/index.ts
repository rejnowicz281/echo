import { PostsActionResponse } from "@/types/posts-action-response";
import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

const getPostReplies = async (page = 1, id: string): Promise<PostsActionResponse> => {
    const actionName = "getPostReplies";

    const supabase = createClient();

    const perPage = 5;

    const { data: posts, error } = await supabase
        .from("posts_with_like_id")
        .select("*, creator:users(*)")
        .eq("parent_post", id)
        .order("created_at", { ascending: false })
        .range((page - 1) * perPage, page * perPage - 1);

    if (error) return actionError(actionName, { error: error.message });

    const isLastPage = posts.length < perPage;

    return actionSuccess(actionName, { posts, isLastPage });
};

export default getPostReplies;
