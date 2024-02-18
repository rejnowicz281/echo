import signOut from "@/actions/auth/modify/sign-out";
import DeleteAccountButton from "@/components/auth/delete-account-button";
import SubmitButton from "@/components/general/submit-button";
import TogglePresenceButton from "@/components/general/toggle-presence-button";

const SettingsPage = () => {
    return (
        <>
            <form action={signOut}>
                <SubmitButton content="Sign Out" loading="Signing out..." />
            </form>
            <DeleteAccountButton />
            <TogglePresenceButton />
        </>
    );
};

export default SettingsPage;
