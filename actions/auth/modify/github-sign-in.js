"use server";

import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";
import { cookies, headers } from "next/headers";

export default async function githubSignIn() {
    const origin = headers().get("origin");
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
            redirectTo: `${origin}/auth/callback`,
        },
    });

    if (error) return actionError("githubSignIn", {}, null, "/login?message=Could not authenticate user");

    return actionSuccess("githubSignIn", {}, null, data.url);
}
