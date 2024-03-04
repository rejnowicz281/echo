import getAcceptedFriends from "@/actions/friendships/read/get-accepted-friends";
import ErrorContainer from "@/components/general/error-container";
import { ChattersProvider } from "@/components/messages/chatters-provider";
import userDisplayName from "@/utils/general/user-display-name";
import Link from "next/link";
import { FC } from "react";

export type MessagesPageLayoutProps = {
    children: React.ReactNode;
};

const MessagesPageLayout: FC<MessagesPageLayoutProps> = async ({ children }) => {
    const { friends } = await getAcceptedFriends();

    if (!friends) return <ErrorContainer error="An error has occurred while fetching your chatters" />;

    return (
        <>
            <ul>
                {friends.map((friend) => (
                    <li key={friend.id}>
                        <Link href={`/messages/${friend.id}`}>{userDisplayName(friend)}</Link>
                    </li>
                ))}
            </ul>
            <ChattersProvider chatters={friends}>{children}</ChattersProvider>
        </>
    );
};

export default MessagesPageLayout;
