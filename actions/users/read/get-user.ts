import getCurrentUser from "@/actions/auth/read/get-current-user";
import { ActionResponse } from "@/types/action-response";
import { Friendship } from "@/types/friendships";
import { User } from "@/types/users";
import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

type UserType = User & { friendship: Friendship; is_current_user: boolean };

type UserActionResponse = ActionResponse & {
    user?: UserType;
};

const getUser = async (id: string): Promise<UserActionResponse> => {
    const actionName = "getUser";

    const supabase = createClient();

    const { user } = await getCurrentUser();

    const isCurrentUser = user.id === id;

    const friendshipInfoQuery = () =>
        isCurrentUser
            ? { data: [undefined], error: null }
            : supabase
                  .from("friendships")
                  .select("*")
                  .or(
                      `and(requester.eq.${user.id}, recipient.eq.${id}), and(requester.eq.${id}, recipient.eq.${user.id})`
                  );

    const userInfoQuery = () =>
        isCurrentUser ? { data: user, error: null } : supabase.from("users").select("*").eq("id", id).single();

    const [friendshipInfo, userInfo] = await Promise.all([friendshipInfoQuery(), userInfoQuery()]);

    if (userInfo.error || friendshipInfo.error)
        return actionError(actionName, { error: userInfo.error || friendshipInfo.error });

    const finalUser = {
        ...userInfo.data,
        friendship: friendshipInfo.data[0],
        is_current_user: isCurrentUser,
    };

    return actionSuccess(actionName, { user: finalUser });
};

export default getUser;
