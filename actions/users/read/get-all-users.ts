import { User } from "@/types/users";
import actionError from "@/utils/actions/action-error";
import { ActionResponse } from "@/utils/actions/action-response";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

export type UsersActionResponse = ActionResponse & {
    users?: User[];
};

const getAllUsers = async (): Promise<UsersActionResponse> => {
    const actionName = "getAllUsers";

    const supabase = createClient();

    const { data: users, error } = await supabase.from("users").select("*").order("created_at", { ascending: false });

    if (error) return actionError(actionName, error);

    return actionSuccess(actionName, { users });
};

export default getAllUsers;
