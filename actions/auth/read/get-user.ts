import { Friendship } from "@/types/friendships";
import { Post } from "@/types/posts";
import { User } from "@/types/users";
import actionError from "@/utils/actions/action-error";
import { ActionResponse } from "@/utils/actions/action-response";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";
import getCurrentUser from "./get-current-user";

export type UserType = User & { friendship: Friendship; posts: Post[] };

export type UserActionResponse = ActionResponse & {
    user?: UserType;
};

const getUser = async (id: string): Promise<UserActionResponse> => {
    const actionName = "getUser";

    const supabase = createClient();

    const { user } = await getCurrentUser();

    const friendshipInfoQuery = () =>
        supabase
            .from("friendships")
            .select("*")
            .or(`and(requester.eq.${user.id}, recipient.eq.${id}), and(requester.eq.${id}, recipient.eq.${user.id})`);

    const userInfoQuery = () => supabase.from("users").select("*").eq("id", id).single();

    const userPostsInfoQuery = () =>
        supabase
            .from("posts")
            .select("*")
            .eq("creator", id)
            .is("parent_post", null)
            .order("created_at", { ascending: false });

    const [friendshipInfo, userInfo, userPostsInfo] = await Promise.all([
        user.id === id ? { data: [undefined], error: null } : friendshipInfoQuery(),
        user.id === id ? { data: user, error: null } : userInfoQuery(),
        userPostsInfoQuery(),
    ]);

    if (userInfo.error || friendshipInfo.error || userPostsInfo.error)
        return actionError(actionName, { error: userInfo.error || friendshipInfo.error || userPostsInfo.error });

    const posts = userPostsInfo.data.map((post) => ({ ...post, creator: userInfo.data }));

    const finalUser = {
        ...userInfo.data,
        posts,
        friendship: friendshipInfo.data[0],
    };

    return actionSuccess(actionName, { user: finalUser });
};

export default getUser;
