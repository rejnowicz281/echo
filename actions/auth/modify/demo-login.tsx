"use server";

import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

const demoLogin = async () => {
    const actionName = "demoLogin";

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
        email: "demo@demo.demo",
        password: "123456",
    });

    if (error) return actionError(actionName, {}, null, "/login?message=Could not authenticate user");

    return actionSuccess(actionName, {}, null, "/");
};

export default demoLogin;
