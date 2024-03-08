import deleteFriendship from "@/actions/friendships/modify/delete-friendship";
import { MdPersonAddDisabled } from "@react-icons/all-files/md/MdPersonAddDisabled";
import { VscLoading } from "@react-icons/all-files/vsc/VscLoading";
import { FC } from "react";
import SubmitButton from "../general/submit-button";
import { Button } from "../shadcn/ui/button";

const CancelFriendRequestButton: FC<{ friendshipId: string }> = ({ friendshipId }) => {
    return (
        <form className="flex flex-col items-center" action={deleteFriendship}>
            <input type="hidden" name="friendship_id" value={friendshipId} />
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
};

export default CancelFriendRequestButton;
