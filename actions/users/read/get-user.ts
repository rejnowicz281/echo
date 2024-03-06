import getCurrentUser from "@/actions/auth/read/get-current-user";
import { ActionResponse } from "@/types/action-response";
import { Friendship } from "@/types/friendships";
import { Post } from "@/types/posts";
import { User } from "@/types/users";
import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

type UserType = User & { friendship: Friendship; posts: Post[]; isCurrentUser: boolean };

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

    const userPostsInfoQuery = () =>
        supabase
            .from("posts_with_details")
            .select("*")
            .eq("creator", id)
            .is("parent_post", null)
            .order("created_at", { ascending: false });

    const [friendshipInfo, userInfo, userPostsInfo] = await Promise.all([
        friendshipInfoQuery(),
        userInfoQuery(),
        userPostsInfoQuery(),
    ]);

    if (userInfo.error || friendshipInfo.error || userPostsInfo.error)
        return actionError(actionName, { error: userInfo.error || friendshipInfo.error || userPostsInfo.error });

    const posts = userPostsInfo.data.map((post) => ({ ...post, creator: userInfo.data }));

    const finalUser = {
        ...userInfo.data,
        posts,
        friendship: friendshipInfo.data[0],
        isCurrentUser,
    };

    return actionSuccess(actionName, { user: finalUser });
};

export default getUser;
