import { Friendship } from "@/types/friendships";
import { User } from "@/types/users";
import actionError from "@/utils/actions/action-error";
import { ActionResponse } from "@/utils/actions/action-response";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

export type UserType = User & { friendship: Friendship };

export type UserActionResponse = ActionResponse & {
    user?: UserType;
};

const getUser = async (id: string): Promise<UserActionResponse> => {
    const actionName = "getUser";

    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return actionError(actionName, { error: "You must be logged in" });

    const [userInfo, friendshipInfo] = await Promise.all([
        supabase.from("users").select("*").eq("id", id).single(),
        supabase
            .from("friendships")
            .select("*")
            .or(`and(requester.eq.${user.id}, recipient.eq.${id}), and(requester.eq.${id}, recipient.eq.${user.id})`),
    ]);

    if (userInfo.error || friendshipInfo.error)
        return actionError(actionName, { error: userInfo.error || friendshipInfo.error });

    const finalUser = {
        ...userInfo.data,
        friendship: friendshipInfo.data[0],
    };

    return actionSuccess(actionName, { user: finalUser });
};

export default getUser;
