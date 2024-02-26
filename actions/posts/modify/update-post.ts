"use server";

import { Post } from "@/types/posts";
import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

const updatePost = async (formData: FormData, postData: Post) => {
    const actionName = "updatePost";

    const supabase = createClient();

    const textFormData = formData.get("text");

    const id = postData.id;
    const text = (() => {
        if (typeof textFormData === "string") {
            const trimmed = textFormData.trim();

            if (trimmed === "") return null;

            return trimmed;
        } else return null;
    })();

    const imageUploadDisabled = formData.get("image_upload_disabled") === "true";

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return actionError(actionName, { error: "You must be logged in to proceed." });

    let updateData: {
        text?: string | null;
        image_url?: string | null;
    } = {};

    if (text !== postData.text) updateData["text"] = text;
    if (!imageUploadDisabled) {
        const imageFormData = formData.get("image");

        const imageFile =
            imageFormData instanceof File && imageFormData.type.startsWith("image/") ? imageFormData : null;

        if (imageFile === null && postData.image_url !== null) {
            // get name of current image
            const currentImage = postData.image_url.split("/").pop() || "";

            // remove current image
            const bucket = supabase.storage.from("posts_images");
            const { error } = await bucket.remove([currentImage]);

            if (error) return actionError(actionName, { error: error.message });

            updateData.image_url = null;
        } else if (imageFile) {
            const bucket = supabase.storage.from("posts_images");

            const fileName = `${Date.now()}`;

            const image_url = bucket.getPublicUrl(fileName).data.publicUrl;

            // upload new post image
            const { error } = await bucket.upload(fileName, imageFile);
            if (error) return actionError(actionName, { error: error.message });

            // remove current post image if it exists
            if (postData.image_url !== null) {
                const currentImage = postData.image_url.split("/").pop() || "";

                const { error } = await bucket.remove([currentImage]);
                if (error) return actionError(actionName, { error: error.message });
            }

            // update image_url
            updateData.image_url = image_url;
        }
    }

    if (Object.keys(updateData).length === 0) return actionError(actionName, { error: "No changes were made." });

    const { error } = await supabase.from("posts").update(updateData).eq("id", id);

    if (error) return actionError(actionName, { error: error.message });

    return actionSuccess(actionName, { ...updateData, id }, "/");
};

export default updatePost;
