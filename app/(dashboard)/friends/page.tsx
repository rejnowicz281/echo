import acceptFriendship from "@/actions/friendships/modify/accept-friendship";
import deleteFriendship from "@/actions/friendships/modify/delete-friendship";
import getAllFriends from "@/actions/friendships/read/get-all-friends";
import ErrorContainer from "@/components/general/error-container";
import PresenceAvatar from "@/components/general/presence-avatar";
import SubmitButton from "@/components/general/submit-button";
import { Button } from "@/components/shadcn/ui/button";
import { User } from "@/types/users";
import userDisplayName from "@/utils/general/user-display-name";
import { FaCheck } from "@react-icons/all-files/fa6/FaCheck";
import { IoClose } from "@react-icons/all-files/io5/IoClose";
import { VscLoading } from "@react-icons/all-files/vsc/VscLoading";
import Link from "next/link";

const FriendsPage = async () => {
    const { acceptedFriends, sentRequests, receivedRequests } = await getAllFriends();

    if (!acceptedFriends || !sentRequests || !receivedRequests)
        return <ErrorContainer error="An error has occurred while fetching your friends" />;

    const userSection = (user: User & { friendship_id: string }, type: "sent" | "received" | "accepted") => {
        const displayName = userDisplayName(user);
        const friendship_id = user.friendship_id;

        const friendshipSection = () => {
            if (type === "accepted") {
                return (
                    <form className="flex flex-col" action={deleteFriendship}>
                        <input type="hidden" name="friendship_id" value={friendship_id} />
                        <Button
                            variant="ghost"
                            asChild
                            className="rounded-t-none text-red-500 hover:text-red-600 transition-colors p-2 flex flex-row items-center gap-1"
                        >
                            <SubmitButton
                                content={
                                    <>
                                        <IoClose />
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
            } else if (type === "sent") {
                return (
                    <form className="flex flex-col" action={deleteFriendship}>
                        <input type="hidden" name="friendship_id" value={friendship_id} />
                        <Button
                            variant="ghost"
                            asChild
                            className="rounded-t-none text-red-500 hover:text-red-600 transition-colors p-2 flex flex-row items-center gap-1"
                        >
                            <SubmitButton
                                content={
                                    <>
                                        <IoClose />
                                        Cancel Request
                                    </>
                                }
                                loading={
                                    <>
                                        <VscLoading className="animate-spin" />
                                        Cancel Request
                                    </>
                                }
                            />
                        </Button>
                    </form>
                );
            } else if (type === "received") {
                return (
                    <div className="flex flex-col">
                        <form className="flex flex-col" action={acceptFriendship}>
                            <input type="hidden" name="friendship_id" value={friendship_id} />
                            <Button
                                variant="ghost"
                                asChild
                                className="rounded-none text-sky-500 hover:text-sky-600 transition-colors p-2 flex flex-row items-center gap-1"
                            >
                                <SubmitButton
                                    content={
                                        <>
                                            <FaCheck />
                                            Accept
                                        </>
                                    }
                                    loading={
                                        <>
                                            <VscLoading className="animate-spin" />
                                            Accept
                                        </>
                                    }
                                />
                            </Button>
                        </form>
                        <form className="flex flex-col" action={deleteFriendship}>
                            <input type="hidden" name="friendship_id" value={friendship_id} />
                            <Button
                                variant="ghost"
                                asChild
                                className="rounded-t-none text-red-500 hover:text-red-600 transition-colors p-2 flex flex-row items-center gap-1"
                            >
                                <SubmitButton
                                    content={
                                        <>
                                            <IoClose />
                                            Reject
                                        </>
                                    }
                                    loading={
                                        <>
                                            <VscLoading className="animate-spin" />
                                            Reject
                                        </>
                                    }
                                />
                            </Button>
                        </form>
                    </div>
                );
            }
        };

        return (
            <div key={user.id} className="rounded-lg w-72 flex flex-col">
                <Link href={`/users/${user.id}`} className="group flex flex-col items-center gap-4 p-4 border-b">
                    <PresenceAvatar avatarSize={100} markerSize={23} userId={user.id} src={user.avatar_url} />
                    <div className="p-2 transition-colors rounded-lg group-hover:bg-gray-200">
                        <div className="text-center">{displayName}</div>
                        {displayName !== user.email && <div className="text-gray-500 text-center">{user.email}</div>}
                    </div>
                </Link>
                {friendshipSection()}
            </div>
        );
    };

    return (
        <div className="p-16 flex-1 flex flex-col gap-10">
            <div className="border-b flex flex-col gap-10 pb-10">
                <h2 className="text-2xl">Received Requests</h2>
                {receivedRequests.length > 0 ? (
                    <div className="flex flex-row flex-wrap gap-6">
                        {receivedRequests.map((user) => userSection(user, "received"))}
                    </div>
                ) : (
                    <div className="text-gray-500">You haven't received any new friend requests.</div>
                )}
            </div>
            <div className="border-b flex flex-col gap-10 pb-10">
                <h2 className="text-2xl">Friends</h2>
                {acceptedFriends.length > 0 ? (
                    <div className="flex flex-row flex-wrap gap-6">
                        {acceptedFriends.map((user) => userSection(user, "accepted"))}
                    </div>
                ) : (
                    <div className="text-gray-500">You don't have any friends.</div>
                )}
            </div>
            <div className="flex flex-col gap-10 pb-10">
                <h2 className="text-2xl">Sent Requests</h2>
                {sentRequests.length > 0 ? (
                    <div className="flex flex-row flex-wrap gap-6">
                        {sentRequests.map((user) => userSection(user, "sent"))}
                    </div>
                ) : (
                    <div className="text-gray-500">You haven't sent any friend requests.</div>
                )}
            </div>
        </div>
    );
};

export default FriendsPage;
