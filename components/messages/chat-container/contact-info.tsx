"use client";

import AcceptFriendshipButton from "@/components/friendships/accept-friendship-button";
import AddAsFriendButton from "@/components/friendships/add-as-friend-button";
import CancelFriendRequestButton from "@/components/friendships/cancel-friend-request-button";
import DeclineFriendshipButton from "@/components/friendships/decline-friendship.button";
import DeleteFriendshipButton from "@/components/friendships/delete-friendship-button";
import PresenceAvatar from "@/components/general/presence-avatar";
import userDisplayName from "@/utils/general/user-display-name";
import Link from "next/link";
import useChatContext from "./chat-provider";

const ContactInfo = () => {
    const { contact } = useChatContext();

    const displayName = userDisplayName(contact);

    const friendshipSection = () => {
        const friendship = contact.friendship;

        if (contact.is_current_user) return <div className="text-gray-500">You are currently talking to yourself</div>;
        else if (!friendship) return <AddAsFriendButton userId={contact.id} />;
        else if (friendship.accepted === true) return <DeleteFriendshipButton friendshipId={friendship.id} />;
        else if (friendship.accepted === false) {
            if (friendship.recipient === contact.id) return <CancelFriendRequestButton friendshipId={friendship.id} />;
            else if (friendship.requester === contact.id) {
                return (
                    <div>
                        <AcceptFriendshipButton friendshipId={friendship.id} />
                        <DeclineFriendshipButton friendshipId={friendship.id} />
                    </div>
                );
            }
        }
    };

    return (
        <div className="p-8 border-b border-b-gray-100 word-break flex flex-wrap items-center gap-2 justify-between">
            <Link href={`/users/${contact.id}`} className="flex items-center gap-3 group">
                <PresenceAvatar avatarSize={60} src={contact.avatar_url} userId={contact.id} />
                <div className="flex flex-col justify-evenly p-2 group-hover:bg-gray-200 rounded-lg transition-colors">
                    <div>{displayName}</div>
                    {contact.email !== displayName && <div className="text-gray-500">{contact.email}</div>}
                </div>
            </Link>
            {friendshipSection()}
        </div>
    );
};

export default ContactInfo;
