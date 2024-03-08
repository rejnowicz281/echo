import acceptFriendship from "@/actions/friendships/modify/accept-friendship";
import { MdPersonAdd } from "@react-icons/all-files/md/MdPersonAdd";
import { VscLoading } from "@react-icons/all-files/vsc/VscLoading";
import { FC } from "react";
import SubmitButton from "../general/submit-button";
import { Button } from "../shadcn/ui/button";

const AcceptFriendshipButton: FC<{ friendshipId: string }> = ({ friendshipId }) => {
    return (
        <form className="flex flex-col items-center" action={acceptFriendship}>
            <input type="hidden" name="friendship_id" value={friendshipId} />
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
    );
};

export default AcceptFriendshipButton;
