import { ActionResponse } from "@/types/action-response";
import { Post } from "@/types/posts";
import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";
import getPostReplies from "./get-post-replies";

type PostActionResponse = ActionResponse & {
    post?: Post & { replies: Post[] };
    isLastPage?: boolean;
};

const getPost = async (id: string): Promise<PostActionResponse> => {
    const actionName = "getPost";

    const supabase = createClient();

    // get post and first page of replies
    const [{ data: post, error: postError }, { posts: replies, isLastPage, error: repliesError }] = await Promise.all([
        supabase.from("posts_with_details").select("*, creator:users(*)").eq("id", id).single(),
        getPostReplies(1, id),
    ]);

    if (postError || repliesError) return actionError(actionName, { error: postError?.message || repliesError });

    if (!post || !replies) return actionError(actionName, { error: "Post not found" });

    return actionSuccess(actionName, { post: { ...post, replies }, isLastPage });
};

export default getPost;
