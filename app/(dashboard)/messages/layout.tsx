import getAcceptedFriends from "@/actions/friendships/read/get-accepted-friends";
import ErrorContainer from "@/components/general/error-container";
import { ContactsProvider } from "@/components/messages/contacts-provider";
import MessagesSidebar from "@/components/messages/sidebar";
import { FC } from "react";

export type MessagesPageLayoutProps = {
    children: React.ReactNode;
};

const MessagesPageLayout: FC<MessagesPageLayoutProps> = async ({ children }) => {
    const { friends } = await getAcceptedFriends();

    if (!friends) return <ErrorContainer error="An error has occurred while fetching your contacts" />;

    return (
        <div className="flex flex-row flex-1">
            <div className="relative flex flex-1">
                <div className="absolute overflow-auto inset-0 flex flex-col">
                    <ContactsProvider contacts={friends}>{children}</ContactsProvider>
                </div>
            </div>
            <div className="relative flex basis-[400px] shrink-0">
                <div className="absolute overflow-auto inset-0">
                    <MessagesSidebar contacts={friends} />
                </div>
            </div>
        </div>
    );
};

export default MessagesPageLayout;
