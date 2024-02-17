import { deleteAccount } from "@/actions/auth/modify/delete-account";
import SubmitButton from "../general/submit-button";

export default function DeleteAccountButton() {
    return (
        <form action={deleteAccount}>
            <SubmitButton content="Delete your account" loading="Deleting..." />
        </form>
    );
}
