"use client";

import acceptFriendship from "@/actions/friendships/modify/accept-friendship";
import createFriendship from "@/actions/friendships/modify/create-friendship";
import deleteFriendship from "@/actions/friendships/modify/delete-friendship";
import useAuthContext from "@/providers/auth-provider";
import { Friendship } from "@/types/friendships";
import { User } from "@/types/users";
import { FC } from "react";
import { IoPersonAdd } from "react-icons/io5";
import { MdPersonAdd, MdPersonAddDisabled, MdPersonRemove } from "react-icons/md";
import { VscLoading } from "react-icons/vsc";
import SubmitButton from "../general/submit-button";
import { Button } from "../shadcn/ui/button";

export type FriendshipContainerProps = {
    userVisited: User & { friendship?: Friendship };
};

const FriendshipContainer: FC<FriendshipContainerProps> = ({ userVisited }) => {
    const { user } = useAuthContext();

    const friendship = userVisited.friendship;

    if (user.id === userVisited.id) {
        return null;
    } else if (!friendship) {
        return (
            <form className="flex flex-col items-center" action={createFriendship}>
                <input type="hidden" name="recipient_id" value={userVisited.id} />

                <Button
                    variant="ghost"
                    asChild
                    className="text-teal-500 hover:text-teal-600 flex flex-row items-center gap-2"
                >
                    <SubmitButton
                        content={
                            <>
                                <IoPersonAdd />
                                Add as friend
                            </>
                        }
                        loading={
                            <>
                                <VscLoading className="animate-spin" />
                                Add as friend
                            </>
                        }
                    />
                </Button>
            </form>
        );
    } else if (friendship.accepted === true) {
        return (
            <form className="flex flex-col items-center" action={deleteFriendship}>
                <input type="hidden" name="friendship_id" value={friendship.id} />
                <Button
                    variant="ghost"
                    asChild
                    className="text-red-500 hover:text-red-600 flex flex-row items-center gap-2"
                >
                    <SubmitButton
                        content={
                            <>
                                <MdPersonRemove />
                                Unfriend
                            </>
                        }
                        loading={
                            <>
                                <VscLoading className="animate-spin" />
                                Unfriend
                            </>
                        }
                    />
                </Button>
            </form>
        );
    } else if (friendship.accepted === false) {
        if (friendship.requester === user.id) {
            return (
                <form className="flex flex-col items-center" action={deleteFriendship}>
                    <input type="hidden" name="friendship_id" value={friendship.id} />
                    <Button
                        variant="ghost"
                        asChild
                        className="text-red-500 hover:text-red-600 flex flex-row items-center gap-2"
                    >
                        <SubmitButton
                            content={
                                <>
                                    <MdPersonAddDisabled />
                                    Cancel Friend Request
                                </>
                            }
                            loading={
                                <>
                                    <VscLoading className="animate-spin" />
                                    Cancel Friend Request
                                </>
                            }
                        />
                    </Button>
                </form>
            );
        } else if (friendship.recipient === user.id) {
            return (
                <div>
                    <form className="flex flex-col items-center" action={acceptFriendship}>
                        <input type="hidden" name="friendship_id" value={friendship.id} />
                        <Button
                            variant="ghost"
                            asChild
                            className="text-teal-500 hover:text-teal-600 flex flex-row items-center gap-2"
                        >
                            <SubmitButton
                                content={
                                    <>
                                        <MdPersonAdd />
                                        Accept Friend Request
                                    </>
                                }
                                loading={
                                    <>
                                        <VscLoading className="animate-spin" />
                                        Accept Friend Request
                                    </>
                                }
                            />
                        </Button>
                    </form>
                    <form className="flex flex-col items-center" action={deleteFriendship}>
                        <input type="hidden" name="friendship_id" value={friendship.id} />
                        <Button
                            variant="ghost"
                            asChild
                            className="text-red-500 hover:text-red-600 flex flex-row items-center gap-2"
                        >
                            <SubmitButton
                                content={
                                    <>
                                        <MdPersonAddDisabled />
                                        Decline Friend Request
                                    </>
                                }
                                loading={
                                    <>
                                        <VscLoading className="animate-spin" />
                                        Decline Friend Request
                                    </>
                                }
                            />
                        </Button>
                    </form>
                </div>
            );
        }
    }
};

export default FriendshipContainer;
