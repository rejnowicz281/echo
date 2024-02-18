"use server";

import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

const addPost = async (formData: FormData) => {
    const actionName = "addPost";

    const text = formData.get("text") || null;
    const imageFile = formData.get("image");

    if ((typeof text !== "string" && text !== null) || !(imageFile instanceof File))
        return actionError(actionName, { error: "Invalid form data" });

    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return actionError(actionName, { error: "You must be logged in to add a post" });

    const bucket = supabase.storage.from("posts_images");
    const fileName = `${Date.now()}`;

    const image_url =
        imageFile && imageFile.type.startsWith("image/") ? bucket.getPublicUrl(fileName).data.publicUrl : null;

    const { data: post } = await supabase.from("posts").insert([{ text, creator: user.id, image_url }]);

    await bucket.upload(fileName, imageFile);

    return actionSuccess(actionName, { post }, "/");
};

export default addPost;
