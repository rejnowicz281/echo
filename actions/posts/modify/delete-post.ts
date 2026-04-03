"use server";

import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

const deletePost = async (formData: FormData) => {
    const actionName = "deletePost";

    const supabase = createClient();

    const id = formData.get("id");
    const image_url = formData.get("image_url");

    const imageName = image_url ? image_url.toString().split("/").pop() : null;

    const [{ error }, { error: storageError }] = await Promise.all([
        supabase.from("posts").delete().eq("id", id),
        imageName ? supabase.storage.from("posts_images").remove([imageName]) : { error: null }
    ]);

    if (error || storageError) return actionError(actionName, { error, storageError });

    return actionSuccess(actionName, { id }, { revalidatePath: "/" });
};

export default deletePost;
