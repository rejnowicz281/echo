"use server";

import { Post } from "@/types/posts";
import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

const updatePost = async (formData: FormData, postData: Post) => {
    const actionName = "updatePost";

    const supabase = createClient();

    const textFormData = formData.get("text");
    const imageFormData = formData.get("image");

    const id = postData.id;
    const text = (() => {
        if (typeof textFormData === "string") {
            const trimmed = textFormData.trim();

            if (trimmed === "") return null;

            return trimmed;
        } else return null;
    })();
    const imageFile = imageFormData instanceof File && imageFormData.type.startsWith("image/") ? imageFormData : null;

    const imageUploadDisabled = formData.get("image_upload_disabled") === "true";

    if (!text && !imageFile && !imageUploadDisabled)
        return actionError(actionName, { error: "You must provide either text or an image to update a post." });

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
            const [{ error: uploadError }, { error: removeError }] = await Promise.all([
                bucket.upload(fileName, imageFile),
                postData.image_url !== null // remove current post image if it exists
                    ? bucket.remove([postData.image_url.split("/").pop() || ""])
                    : { error: null },
            ]);

            if (uploadError || removeError)
                return actionError(actionName, { error: uploadError?.message || removeError?.message });

            // update image_url
            updateData.image_url = image_url;
        }
    }

    if (Object.keys(updateData).length === 0) return actionSuccess(actionName, { message: "No changes were made." });

    const { error } = await supabase.from("posts").update(updateData).eq("id", id);

    if (error) return actionError(actionName, { error: error.message });

    return actionSuccess(actionName, { ...updateData, id }, { revalidatePath: "/" });
};

export default updatePost;
