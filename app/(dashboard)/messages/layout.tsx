import getContacts from "@/actions/messages/read/get-contacts";
import ErrorContainer from "@/components/general/error-container";
import MessagesSidebar from "@/components/messages/sidebar";
import { FC } from "react";

export type MessagesPageLayoutProps = {
    children: React.ReactNode;
};

const MessagesPageLayout: FC<MessagesPageLayoutProps> = async ({ children }) => {
    const { contacts } = await getContacts();

    if (!contacts) return <ErrorContainer error="An error has occurred while fetching your contacts" />;

    return (
        <div className="flex flex-row flex-1">
            <div className="relative flex flex-1">
                <div className="absolute overflow-auto inset-0 flex-1 flex flex-col">{children}</div>
            </div>
            <div className="relative flex basis-[400px] shrink-0">
                <div className="absolute overflow-auto inset-0 flex-1 flex flex-col">
                    <MessagesSidebar contacts={contacts} />
                </div>
            </div>
        </div>
    );
};

export default MessagesPageLayout;
