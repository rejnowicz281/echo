import createFriendship from "@/actions/friendships/modify/create-friendship";
import { IoPersonAdd } from "@react-icons/all-files/io5/IoPersonAdd";
import { VscLoading } from "@react-icons/all-files/vsc/VscLoading";
import { FC } from "react";
import SubmitButton from "../general/submit-button";
import { Button } from "../shadcn/ui/button";

const AddAsFriendButton: FC<{ userId: string }> = ({ userId }) => {
    return (
        <form className="flex flex-col items-center" action={createFriendship}>
            <input type="hidden" name="recipient_id" value={userId} />

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
};

export default AddAsFriendButton;
