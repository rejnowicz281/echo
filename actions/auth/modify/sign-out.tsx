"use server";

import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();

    return actionSuccess("signOut", {}, null, "/login");
};

export default signOut;
