import deletePost from "@/actions/posts/modify/delete-post";
import SubmitButton from "@/components/general/submit-button";

export default function DeletePostButton({ id }) {
    return (
        <form action={deletePost}>
            <input type="hidden" name="id" value={id} />
            <SubmitButton content="Delete Post" loading="Deleting..." />
        </form>
    );
}
