import { Post } from "@/types/posts";
import actionError from "@/utils/actions/action-error";
import { ActionResponse } from "@/utils/actions/action-response";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

export type PostsActionResponse = ActionResponse & {
    posts?: Post[];
};

const getAllPosts = async (): Promise<PostsActionResponse> => {
    const actionName = "getAllPosts";

    const supabase = createClient();

    const { data: posts, error } = await supabase
        .from("posts")
        .select("*, creator: users(*)")
        .order("created_at", { ascending: false });

    if (error) return actionError(actionName, error);

    // go through each post from the posts array and check if any of the other posts have parent_post equal to the current post's id
    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        if (!post.replies) post.replies = [];

        if (post.parent_post) {
            const parentPost = posts.find((p) => p.id === post.parent_post);
            if (parentPost) {
                if (!parentPost.replies) parentPost.replies = [];

                parentPost.replies.push(post);
            }
        }

        console.log(post.id, "after format:", post);
    }

    // filter out the posts that have a parent_post
    const filteredPosts = posts.filter((post) => !post.parent_post);

    return actionSuccess(actionName, { posts: filteredPosts });
};

export default getAllPosts;
