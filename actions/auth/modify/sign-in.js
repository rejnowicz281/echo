"use server";

import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function signIn(formData) {
    const email = formData.get("email");
    const password = formData.get("password");

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) return actionError("signIn", {}, null, "/login?message=Invalid Email or Password");

    return actionSuccess("signIn", {}, null, "/");
}
