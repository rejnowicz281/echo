import deletePost from "@/actions/posts/modify/delete-post";
import { FC } from "react";
import SubmitButton from "../general/submit-button";

export type DeletePostButtonProps = {
    id: string;
    content?: string;
    loading?: string;
};

const DeletePostButton: FC<DeletePostButtonProps> = ({ id, content = "Delete Post", loading = "Deleting Post..." }) => {
    return (
        <form action={deletePost}>
            <input type="hidden" name="id" value={id} />
            <SubmitButton content={content} loading={loading} />
        </form>
    );
};

export default DeletePostButton;
