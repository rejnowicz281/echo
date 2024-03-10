"use server";

import { ActionResponse } from "@/types/action-response";
import { User } from "@/types/users";
import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

type UsersActionResponse = ActionResponse & {
    users?: User[];
};

const getFilteredUsers = async (filter: string): Promise<UsersActionResponse> => {
    const actionName = "getFilteredUsers";

    const supabase = createClient();

    const { data: users, error } = await supabase.rpc("get_users_by_name", { name_param: filter });

    if (error) return actionError(actionName, error);

    return actionSuccess(actionName, { users }, { logData: false });
};

export default getFilteredUsers;
