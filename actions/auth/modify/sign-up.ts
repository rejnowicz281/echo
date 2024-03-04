"use server";

import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";

const signUp = async (formData: FormData) => {
    const actionName = "signUp";

    const emailFormData = formData.get("email");
    const firstNameFormData = formData.get("first_name");
    const lastNameFormData = formData.get("last_name");
    const passwordFormData = formData.get("password");
    const passwordConfirmFormData = formData.get("password_confirm");
    const avatarFileFormData = formData.get("avatar");

    const email = typeof emailFormData === "string" ? emailFormData.trim() : null;
    const first_name = typeof firstNameFormData === "string" ? firstNameFormData.trim() : null;
    const last_name = typeof lastNameFormData === "string" ? lastNameFormData.trim() : null;
    const password = typeof passwordFormData === "string" ? passwordFormData.trim() : null;
    const password_confirm = typeof passwordConfirmFormData === "string" ? passwordConfirmFormData.trim() : null;
    const avatarFile =
        avatarFileFormData instanceof File && avatarFileFormData.type.startsWith("image/") ? avatarFileFormData : null;

    const origin = headers().get("origin");

    const supabase = createClient();

    const queryParams = new URLSearchParams();

    if (!email) queryParams.append("message", "Email is required");
    else if (!email.includes("@")) queryParams.append("message", "Email must be valid");

    if (!first_name) queryParams.append("message", "First name is required");
    if (!last_name) queryParams.append("message", "Last name is required");

    if (!password) queryParams.append("message", "Password is required");
    else {
        if (password.length < 6) queryParams.append("message", "Password must be at least 6 characters");

        if (!password_confirm) queryParams.append("message", "Password confirmation is required");
        else if (password !== password_confirm) queryParams.append("message", "Passwords do not match");
    }

    const queryParamsString = queryParams.toString();

    if (queryParamsString)
        return actionError(actionName, { queryParams }, { redirectPath: `/register?${queryParamsString}` });

    const avatarData = (() => {
        if (avatarFile) {
            const bucket = supabase.storage.from("avatars");
            const fileName = `${Date.now()}`;
            const avatar_url = bucket.getPublicUrl(fileName).data.publicUrl;

            return { bucket, fileName, avatar_url };
        }

        return {
            avatar_url: process.env.DEFAULT_AVATAR_URL,
        };
    })();

    const { bucket, fileName, avatar_url } = avatarData;

    const { error } = await supabase.auth.signUp({
        email: email as string,
        password: password as string,
        options: {
            data: {
                first_name: first_name,
                last_name: last_name,
                avatar_url,
            },
            emailRedirectTo: `${origin}/auth/callback`,
        },
    });

    if (error) return actionError(actionName, { error }, { redirectPath: `/register?message=${error.message}` });

    if (bucket && fileName && avatarFile) {
        const { error } = await bucket.upload(fileName, avatarFile);
        if (error) return actionError(actionName, { error }, { redirectPath: `/register?message=${error.message}` });
    }

    return actionSuccess(actionName, {}, { redirectPath: "/" });
};

export default signUp;
