"use server";

import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

const deletePost = async (formData: FormData) => {
    const actionName = "deletePost";

    const supabase = createClient();

    const id = formData.get("id");

    const { data: post, error } = await supabase.from("posts").delete().eq("id", id);

    if (error) return actionError(actionName, { error });

    return actionSuccess(actionName, { id }, "/");
};

export default deletePost;
