"use server";

import { Post } from "@/types/posts";
import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

const updatePost = async (formData: FormData, postData: Post) => {
    const actionName = "updatePost";

    const supabase = createClient();

    const id = postData.id;
    const text = formData.get("text") || "";
    const imageFile = formData.get("image");

    if (typeof id !== "string" || typeof text !== "string" || (!(imageFile instanceof File) && imageFile !== null))
        return actionError(actionName, { error: "Invalid form data." });

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return actionError(actionName, { error: "You must be logged in to proceed." });

    let updateData: {
        text?: string;
        image_url?: string | null;
    } = {};

    if (text && text !== postData.text) updateData["text"] = text;
    if (postData.image_url !== null && imageFile && imageFile.size === 0) {
        // get name of current image
        const currentImage = postData.image_url.split("/").pop() || "";

        // remove current image
        const bucket = supabase.storage.from("posts_images");
        const { error } = await bucket.remove([currentImage]);

        if (error) return actionError(actionName, { error: error.message });

        updateData.image_url = null;
    } else if (imageFile && imageFile.type.startsWith("image/")) {
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

    if (Object.keys(updateData).length === 0) return actionError(actionName, { error: "No changes were made." });

    const { error } = await supabase.from("posts").update(updateData).eq("id", id);

    if (error) return actionError(actionName, { error: error.message });

    return actionSuccess(actionName, { ...updateData, id }, "/");
};

export default updatePost;
