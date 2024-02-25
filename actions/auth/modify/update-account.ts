"use server";

import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

const updateAccount = async (formData: FormData) => {
    const actionName = "updateAccount";

    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return actionError(actionName, { error: "You must be logged in to update your account." });

    if (user.id === process.env.DEMO_USER_ID)
        return actionError(actionName, { error: "You cannot update this demo account." });

    const isEmailProvider = user.app_metadata.provider === "email";

    const first_name = formData.get("first_name") || "";
    const last_name = formData.get("last_name") || "";
    const password = isEmailProvider ? formData.get("password") : "";
    const resetAvatar = formData.get("reset_avatar") === "on";
    const avatarFile = isEmailProvider ? formData.get("avatar") : null;

    if (
        typeof first_name !== "string" ||
        typeof last_name !== "string" ||
        typeof password !== "string" ||
        (!(avatarFile instanceof File) && avatarFile !== null)
    )
        return actionError(actionName, { error: "Invalid form data." });

    let updateData: {
        data: {
            first_name?: string;
            last_name?: string;
            avatar_url?: string;
        };
        password?: string;
    } = { data: {} };

    if (first_name && first_name !== user.user_metadata.first_name) updateData.data["first_name"] = first_name;
    if (last_name && last_name !== user.user_metadata.last_name) updateData.data["last_name"] = last_name;
    if (password) updateData["password"] = password;
    if (resetAvatar) {
        // get name of current avatar
        const currentAvatar = user.user_metadata.avatar_url.split("/").pop();

        // reset current user avatar if it's not already the default
        if (currentAvatar !== "default_avatar.jpg") {
            const bucket = supabase.storage.from("avatars");

            const { error } = await bucket.remove([currentAvatar]);

            if (error) return actionError(actionName, { error: error.message });

            updateData.data.avatar_url =
                "https://trvvoqhvriwitcyitfid.supabase.co/storage/v1/object/public/avatars/default_avatar.jpg";
        }
    } else if (avatarFile && avatarFile.type.startsWith("image/")) {
        const bucket = supabase.storage.from("avatars");

        const fileName = `${Date.now()}`;

        const avatar_url = bucket.getPublicUrl(fileName).data.publicUrl;

        const { error } = await bucket.upload(fileName, avatarFile);

        if (error) return actionError(actionName, { error: error.message });

        // get name of current avatar
        const currentAvatar = user.user_metadata.avatar_url.split("/").pop();

        // remove current user avatar if it's not the default
        if (currentAvatar !== "default_avatar.jpg") {
            const { error } = await bucket.remove([currentAvatar]);
            if (error) return actionError(actionName, { error: error.message });
        }

        updateData.data.avatar_url = avatar_url;
    }

    if (JSON.stringify(updateData) === JSON.stringify({ data: {} }))
        return actionError(actionName, { error: "No changes were made." });

    const { error } = await supabase.auth.updateUser(updateData);

    if (error) return actionError(actionName, { error: error.message });

    const actionData = { ...updateData };

    if (password) actionData.password = "********";

    const revalidatePath = (first_name && last_name) || updateData.data?.avatar_url ? "/" : null;

    return actionSuccess(actionName, actionData, revalidatePath);
};

export default updateAccount;
