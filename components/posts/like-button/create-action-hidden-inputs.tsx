import useAuthContext from "@/providers/auth-provider";
import { FC } from "react";

type InputsProps = {
    postId: string;
};

const CreateActionHiddenInputs: FC<InputsProps> = ({ postId }) => {
    const { user } = useAuthContext();

    return (
        <>
            <input type="hidden" name="user" value={user.id} />
            <input type="hidden" name="post" value={postId} />
        </>
    );
};

export default CreateActionHiddenInputs;
