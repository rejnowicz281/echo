"use server";

import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";

const signUp = async (formData: FormData) => {
    const email = formData.get("email");
    const first_name = formData.get("first_name");
    const last_name = formData.get("last_name");
    const password = formData.get("password");
    const password_confirm = formData.get("password_confirm");
    const avatarFile = formData.get("avatar");

    if (
        typeof email !== "string" ||
        typeof first_name !== "string" ||
        typeof last_name !== "string" ||
        typeof password !== "string" ||
        typeof password_confirm !== "string" ||
        !(avatarFile instanceof File)
    )
        return actionError("signUp", {}, null, "/register?message=Invalid form data");

    const origin = headers().get("origin");

    const supabase = createClient();

    const queryParams = new URLSearchParams();

    if (!email) queryParams.append("message", "Email is required");
    if (!email.includes("@")) queryParams.append("message", "Email must be valid");
    if (!first_name) queryParams.append("message", "First name is required");
    if (!last_name) queryParams.append("message", "Last name is required");
    if (!password) queryParams.append("message", "Password is required");
    if (password.length < 6) queryParams.append("message", "Password must be at least 6 characters");
    if (!password_confirm) queryParams.append("message", "Password confirmation is required");
    if (password !== password_confirm) queryParams.append("message", "Passwords do not match");

    const queryParamsString = queryParams.toString();

    if (queryParamsString) return actionError("signUp", { queryParams }, null, `/register?${queryParamsString}`);

    const bucket = supabase.storage.from("avatars");
    const fileName = `${Date.now()}`;

    const avatar_url = avatarFile.type.startsWith("image/")
        ? bucket.getPublicUrl(fileName).data.publicUrl
        : "https://trvvoqhvriwitcyitfid.supabase.co/storage/v1/object/public/avatars/default_avatar.jpg";

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                first_name: first_name,
                last_name: last_name,
                avatar_url,
            },
            emailRedirectTo: `${origin}/auth/callback`,
        },
    });

    if (error) return actionError("signUp", { error }, null, `/register?message=${error.message}`);

    const { data: avatar } = await bucket.upload(fileName, avatarFile);

    if (!avatar) return actionError("signUp", { error: "Couldn't finish sign up (Avatar Upload Error)" });

    return actionSuccess("signUp", {}, null, "/");
};

export default signUp;
