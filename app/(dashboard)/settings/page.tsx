import signOut from "@/actions/auth/modify/sign-out";
import DeleteAccountButton from "@/components/auth/delete-account-button";
import SubmitButton from "@/components/general/submit-button";
import TogglePresenceButton from "@/components/general/toggle-presence-button";
import Link from "next/link";

const SettingsPage = () => {
    return (
        <>
            <Link href="/">Home</Link>
            <form action={signOut}>
                <SubmitButton content="Sign Out" loading="Signing out..." />
            </form>
            <DeleteAccountButton />
            <TogglePresenceButton />
        </>
    );
};

export default SettingsPage;
