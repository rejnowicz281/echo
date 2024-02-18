import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

const getAllUsers = async () => {
    const actionName = "getAllUsers";

    const supabase = createClient();

    const { data: users, error } = await supabase.from("users").select("*").order("created_at", { ascending: false });

    if (error) return actionError(actionName, error);

    return actionSuccess(actionName, { users });
};

export default getAllUsers;
