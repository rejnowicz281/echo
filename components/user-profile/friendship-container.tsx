"use client";

import AcceptFriendshipButton from "@/components/friendships/accept-friendship-button";
import AddAsFriendButton from "@/components/friendships/add-as-friend-button";
import CancelFriendRequestButton from "@/components/friendships/cancel-friend-request-button";
import DeclineFriendshipButton from "@/components/friendships/decline-friendship.button";
import DeleteFriendshipButton from "@/components/friendships/delete-friendship-button";
import useAuthContext from "@/providers/auth-provider";
import { Friendship } from "@/types/friendships";
import { User } from "@/types/users";
import { FC } from "react";

type FriendshipContainerProps = {
    userVisited: User & { friendship?: Friendship };
};

const FriendshipContainer: FC<FriendshipContainerProps> = ({ userVisited }) => {
    const { user } = useAuthContext();

    const friendship = userVisited.friendship;

    if (user.id === userVisited.id) return null;
    else if (!friendship) return <AddAsFriendButton userId={userVisited.id} />;
    else if (friendship.accepted === true) return <DeleteFriendshipButton friendshipId={friendship.id} />;
    else if (friendship.accepted === false) {
        if (friendship.requester === user.id) return <CancelFriendRequestButton friendshipId={friendship.id} />;
        else if (friendship.recipient === user.id) {
            return (
                <div>
                    <AcceptFriendshipButton friendshipId={friendship.id} />
                    <DeclineFriendshipButton friendshipId={friendship.id} />
                </div>
            );
        }
    }
};

export default FriendshipContainer;
