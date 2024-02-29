import getUser from "@/actions/users/read/get-user";
import PresenceAvatar from "@/components/general/presence-avatar";
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

    if (!user) return <div>There was an error fetching the user</div>;

    const displayName = userDisplayName(user);

    return (
        <>
            <div className="px-12 pb-12 flex flex-col gap-3">
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
                    <FriendshipContainer userVisited={user} />
                    {user.id !== process.env.DEMO_USER_ID && <SettingsContainer user={user} />}
                </div>
                <UserProvider user={user}>{children}</UserProvider>
            </div>
        </>
    );
};

export default UserPageLayout;
