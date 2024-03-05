import getUser from "@/actions/users/read/get-user";
import ErrorContainer from "@/components/general/error-container";
import PresenceAvatar from "@/components/general/presence-avatar";
import ChatWithButton from "@/components/user-profile/chat-with-button";
import FriendshipContainer from "@/components/user-profile/friendship-container";
import SectionLinks from "@/components/user-profile/section-links";
import SettingsContainer from "@/components/user-profile/settings-container";
import { UserProvider } from "@/components/user-profile/user-provider";
import userDisplayName from "@/utils/general/user-display-name";
import { FC } from "react";

export type UserPageLayoutProps = {
    children: React.ReactNode;
    params: { id: string };
};

const UserPageLayout: FC<UserPageLayoutProps> = async ({ children, params: { id } }) => {
    const { user } = await getUser(id);

    if (!user)
        return (
            <ErrorContainer error="An error has occured while fetching this user. Are you sure the ID is correct?" />
        );

    const displayName = userDisplayName(user);

    return (
        <div className="flex-1 px-12 pb-12 flex flex-col gap-3">
            <div className="mx-auto max-w-[700px] w-full flex flex-col gap-3">
                <SectionLinks userId={id} />
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
                <div>
                    <ChatWithButton userId={user.id} />
                    <FriendshipContainer userVisited={user} />
                </div>

                <SettingsContainer userId={user.id} isCurrentUser={user.isCurrentUser} />
            </div>
            <UserProvider user={user}>{children}</UserProvider>
        </div>
    );
};

export default UserPageLayout;
