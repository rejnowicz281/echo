import deleteAccount from "@/actions/auth/modify/delete-account";
import SubmitButton from "@/components/general/submit-button";

const DeleteAccountButton = () => {
    return (
        <form action={deleteAccount}>
            <SubmitButton content="Delete your account" loading="Deleting..." />
        </form>
    );
};

export default DeleteAccountButton;
