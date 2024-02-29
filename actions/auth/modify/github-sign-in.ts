"use server";

import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";

const githubSignIn = async () => {
    const actionName = "githubSignIn";

    const origin = headers().get("origin");
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
            redirectTo: `${origin}/auth/callback`,
        },
    });

    if (error) return actionError(actionName, {}, { redirectPath: "/login?message=Could not authenticate user" });

    return actionSuccess(actionName, {}, { redirectPath: data.url });
};

export default githubSignIn;
