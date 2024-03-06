"use server";

import { ActionResponse } from "@/types/action-response";
import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

const addPost = async (formData: FormData): Promise<ActionResponse> => {
    const actionName = "addPost";

    const textFormData = formData.get("text");
    const imageFormData = formData.get("image");
    const parentPostFormData = formData.get("parent_post");

    const text = (() => {
        if (typeof textFormData === "string") {
            const trimmed = textFormData.trim();

            if (trimmed === "") return null;

            return trimmed;
        } else return null;
    })();
    const imageFile = imageFormData instanceof File && imageFormData.type.startsWith("image/") ? imageFormData : null;
    const parent_post = typeof parentPostFormData === "string" ? parentPostFormData : null;

    if (!text && !imageFile)
        return actionError(actionName, { error: "You must provide either text or an image to add a post" });

    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return actionError(actionName, { error: "You must be logged in to add a post" });

    const imageData = (() => {
        if (imageFile) {
            const bucket = supabase.storage.from("posts_images");
            const fileName = `${Date.now()}`;
            const image_url = bucket.getPublicUrl(fileName).data.publicUrl;

            return { bucket, fileName, image_url };
        }

        return { image_url: null };
    })();

    const { bucket, fileName, image_url } = imageData;

    const [{ error: insertError }, { error: uploadError }] = await Promise.all([
        supabase.from("posts").insert([
            {
                text,
                creator: user.id,
                image_url,
                parent_post,
            },
        ]),
        bucket && fileName && imageFile ? bucket.upload(fileName, imageFile) : { error: null },
    ]);

    if (insertError || uploadError)
        return actionError(actionName, { error: insertError?.message || uploadError?.message });

    return actionSuccess(actionName, {}, { revalidatePath: "/" });
};

export default addPost;
