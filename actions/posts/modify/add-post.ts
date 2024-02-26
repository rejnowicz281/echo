"use server";

import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

const addPost = async (formData: FormData) => {
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
    const parent_post = parentPostFormData === "string" ? parentPostFormData : null;

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

    const { error } = await supabase.from("posts").insert([
        {
            text,
            creator: user.id,
            image_url,
            parent_post,
        },
    ]);
    if (error) return actionError(actionName, { error: error.message });

    if (bucket && fileName && imageFile) {
        const { error } = await bucket.upload(fileName, imageFile);
        if (error) return actionError(actionName, { error: error.message });
    }

    return actionSuccess(actionName, {}, "/");
};

export default addPost;
