"use client";

import acceptFriendship from "@/actions/friendships/modify/accept-friendship";
import createFriendship from "@/actions/friendships/modify/create-friendship";
import deleteFriendship from "@/actions/friendships/modify/delete-friendship";
import useAuthContext from "@/providers/auth-provider";
import { Friendship } from "@/types/friendships";
import { User } from "@/types/users";
import { FC } from "react";
import SubmitButton from "../general/submit-button";

export type FriendshipContainerProps = {
    userVisited: User & { friendship?: Friendship };
};

const FriendshipContainer: FC<FriendshipContainerProps> = ({ userVisited }) => {
    const { user } = useAuthContext();

    const friendship = userVisited.friendship;

    if (user.id === userVisited.id) {
        return <div>This is you</div>;
    } else if (!friendship) {
        return (
            <form action={createFriendship}>
                <input type="hidden" name="recipient_id" value={userVisited.id} />

                <SubmitButton content={"Add friend"} loading={"Adding friend..."} />
            </form>
        );
    } else if (friendship.accepted === true) {
        return (
            <>
                <p>You are friends</p>
                <form action={deleteFriendship}>
                    <input type="hidden" name="friendship_id" value={friendship.id} />
                    <SubmitButton content={"Unfriend"} loading={"Unfriending..."} />
                </form>
            </>
        );
    } else if (friendship.accepted === false) {
        if (friendship.requester === user.id) {
            return (
                <>
                    <p>You have sent a friend request</p>
                    <form action={deleteFriendship}>
                        <input type="hidden" name="friendship_id" value={friendship.id} />
                        <SubmitButton content={"Cancel friend request"} loading={"Cancelling..."} />
                    </form>
                </>
            );
        } else if (friendship.recipient === user.id) {
            return (
                <>
                    <p>You have received a friend request from this user</p>
                    <form action={acceptFriendship}>
                        <input type="hidden" name="friendship_id" value={friendship.id} />
                        <SubmitButton content={"Accept"} loading={"Accepting..."} />
                    </form>
                    <form action={deleteFriendship}>
                        <input type="hidden" name="friendship_id" value={friendship.id} />
                        <SubmitButton content={"Decline"} loading={"Declining..."} />
                    </form>
                </>
            );
        }
    }
};

export default FriendshipContainer;
