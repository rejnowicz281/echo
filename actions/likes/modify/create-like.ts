"use server";

import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

const createLike = async (formData: FormData) => {
    const actionName = "createLike";

    const post = formData.get("post");
    const user = formData.get("user");
    console.log(post, user);

    const supabase = createClient();

    const { error } = await supabase.from("posts_likes").insert([{ post, user }]);

    if (error) return actionError(actionName, { error });

    return actionSuccess(actionName, { post, user }, "/");
};

export default createLike;
