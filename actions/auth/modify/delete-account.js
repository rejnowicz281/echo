"use server";

import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function deleteAccount() {
    const actionName = "deleteAccount";

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data } = await supabase.auth.getUser();

    const id = data.user?.id;

    if (id === process.env.DEMO_USER_ID)
        return actionError(actionName, { error: "You cannot delete this demo account." });

    const { data: user, error } = await supabase.from("users").delete().eq("id", id);

    if (error) return actionError(actionName, { error });

    await supabase.auth.signOut();

    return actionSuccess(actionName, { id }, null, "/login");
}
