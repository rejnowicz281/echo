import addPost from "@/actions/posts/modify/add-post";
import ImagePicker from "@/components/general/image-picker";
import SubmitButton from "@/components/general/submit-button";
import { FC } from "react";

export type PostFormProps = {
    content?: string;
    loading?: string;
    parent_post?: string;
};

const PostForm: FC<PostFormProps> = ({ content = "Add Post", loading = "Adding Post...", parent_post }) => {
    return (
        <form action={addPost}>
            {parent_post && <input type="hidden" name="parent_post" value={parent_post} />}
            <label htmlFor="text">Text:</label>
            <input type="text" name="text" id="text" />
            <label htmlFor="image">Image (optional)</label>
            <ImagePicker id="image" name="image" />
            <SubmitButton content={content} loading={loading} />
        </form>
    );
};

export default PostForm;
