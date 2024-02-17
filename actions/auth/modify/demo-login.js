"use server";

import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function demoLogin() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signInWithPassword({
        email: "demo@demo.demo",
        password: "123456",
    });

    if (error) return actionError("demoLogin", {}, null, "/login?message=Could not authenticate user");

    return actionSuccess("demoLogin", {}, null, "/");
}
