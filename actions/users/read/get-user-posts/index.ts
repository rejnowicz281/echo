import { PostsActionResponse } from "@/types/posts-action-response";
import { User } from "@/types/users";
import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

const getUserPosts = async (page = 1, user: User): Promise<PostsActionResponse> => {
    const actionName = "getUserPosts";

    const supabase = createClient();

    const perPage = 5;

    const { data: initialPosts, error } = await supabase
        .from("posts_with_like_id")
        .select("*")
        .eq("creator", user.id)
        .is("parent_post", null)
        .order("created_at", { ascending: false })
        .range((page - 1) * perPage, page * perPage - 1);

    if (error) return actionError(actionName, { error: error.message });

    const posts = initialPosts.map((post) => ({ ...post, creator: user }));

    const isLastPage = initialPosts.length < perPage;

    return actionSuccess(actionName, { posts, isLastPage }, { logData: false });
};

export default getUserPosts;
