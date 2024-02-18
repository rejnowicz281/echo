import deletePost from "@/actions/posts/modify/delete-post";
import { FC } from "react";
import SubmitButton from "../general/submit-button";

export type DeletePostButtonProps = {
    id: string;
};

const DeletePostButton: FC<DeletePostButtonProps> = ({ id }) => {
    return (
        <form action={deletePost}>
            <input type="hidden" name="id" value={id} />
            <SubmitButton content="Delete Post" loading="Deleting..." />
        </form>
    );
};

export default DeletePostButton;
