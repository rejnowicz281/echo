import getUser from "@/actions/auth/read/get-user";
import PresenceAvatar from "@/components/general/presence-avatar";
import ConditionalPostForm from "@/components/user-profile/conditional-post-form";
import FriendshipContainer from "@/components/user-profile/friendship-container";
import PostsList from "@/components/user-profile/posts-list";
import SettingsContainer from "@/components/user-profile/settings-container";
import userDisplayName from "@/utils/general/user-display-name";
import { FC } from "react";

export type UserPageProps = {
    params: { id: string };
};

const UserPage: FC<UserPageProps> = async ({ params: { id } }) => {
    const { user } = await getUser(id);

    if (!user) return <div>There was an error fetching the user</div>;

    const displayName = userDisplayName(user);

    return (
        <div className="p-12 mx-auto max-w-[800px] w-full flex flex-col gap-3">
            <div className="word-break flex flex-col items-center gap-3">
                <PresenceAvatar markerSize={23} avatarSize={100} userId={user.id} src={user.avatar_url} />
                <div className="text-center">
                    <div>{displayName}</div>
                    {displayName !== user.email && <div className="text-gray-500">{user.email}</div>}
                </div>
            </div>
            <div className="text-center text-sm text-gray-500">
                Member since {new Date(user.created_at).toLocaleDateString()}
            </div>
            <FriendshipContainer userVisited={user} />
            {user.id !== process.env.DEMO_USER_ID && <SettingsContainer user={user} />}

            <div className="flex flex-col gap-10">
                <ConditionalPostForm userId={user.id} />
                <PostsList user={user} />
            </div>
        </div>
    );
};

export default UserPage;
