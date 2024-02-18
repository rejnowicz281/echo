import { User } from "@/types/users";
import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

const getCurrentUser = async () => {
    const actionName = "getCurrentUser";

    const supabase = createClient();

    const { data } = await supabase.auth.getUser();

    if (!data.user?.id) return actionError(actionName, {}, "/login");

    const user: User = {
        id: data.user.id,
        email: data.user.email!,
        first_name: data.user.user_metadata.first_name,
        last_name: data.user.user_metadata.last_name,
        avatar_url: data.user.user_metadata.avatar_url,
    };

    return actionSuccess(actionName, { user });
};

export default getCurrentUser;
