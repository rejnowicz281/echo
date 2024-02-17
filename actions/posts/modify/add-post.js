"use server";

import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function addPost(formData) {
    const actionName = "addPost";

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const text = formData.get("text") || null;
    const imageFile = formData.get("image");

    const bucket = supabase.storage.from("posts_images");
    const fileName = `${Date.now()}`;

    const image_url = imageFile.type.startsWith("image/") ? bucket.getPublicUrl(fileName).data.publicUrl : null;

    const { data: post, postError } = await supabase.from("posts").insert([{ text, creator: user.id, image_url }]);

    if (postError) return actionError(actionName, { postError });

    const { data: image, imageError } = await bucket.upload(fileName, imageFile);

    if (imageError) return actionError(actionName, { imageError });

    return actionSuccess(actionName, { post: JSON.stringify(post) }, "/");
}
