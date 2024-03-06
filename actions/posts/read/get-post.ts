import { ActionResponse } from "@/types/action-response";
import { Post } from "@/types/posts";
import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

type PostActionResponse = ActionResponse & {
    post?: Post & { replies: Post[] };
};

const getPost = async (id: string): Promise<PostActionResponse> => {
    const actionName = "getPost";

    const supabase = createClient();

    // get post that has same id as the one passed in or parent_post
    const { data: posts, error } = await supabase
        .from("posts_with_details")
        .select("*, creator:users(*)")
        .or(`id.eq.${id}, parent_post.eq.${id}`)
        .order("created_at", { ascending: false });

    if (error) return actionError(actionName, error);

    // create a new post object with the post with the same id as the one passed in and a replies array
    const post = posts.find((p) => p.id === id);

    if (!post) return actionError(actionName, { error: "Post not found" });

    post.replies = posts.filter((p) => p.parent_post === post.id);

    return actionSuccess(actionName, { post });
};

export default getPost;
