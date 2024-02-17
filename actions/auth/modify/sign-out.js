"use server";

import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function signOut() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    await supabase.auth.signOut();

    return actionSuccess("signOut", {}, null, "/login");
}
