"use server";

import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

const deleteAccount = async () => {
    const actionName = "deleteAccount";

    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return actionError(actionName, { error: "You must be logged in to delete your account." });

    if (user.id === process.env.DEMO_USER_ID || user.email === "demo@demo.demo")
        return actionError(actionName, { error: "You cannot delete this demo account." });

    const { error } = await supabase.from("users").delete().eq("id", user.id);

    if (error) return actionError(actionName, { error });

    await supabase.auth.signOut();

    return actionSuccess(actionName, { email: user.email }, { redirectPath: "/login" });
};

export default deleteAccount;
