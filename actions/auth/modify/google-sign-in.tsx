"use server";

import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";

const googleSignIn = async () => {
    const origin = headers().get("origin");

    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: `${origin}/auth/callback`,
        },
    });

    if (error) return actionError("googleSignIn", {}, null, "/login?message=Could not authenticate user");

    return actionSuccess("googleSignIn", {}, null, data.url);
};

export default googleSignIn;
