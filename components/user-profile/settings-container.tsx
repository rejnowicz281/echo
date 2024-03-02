import { FC } from "react";
import DeleteAccountButton from "./delete-account-button";
import EditAccountButton from "./edit-account-button";

export type SettingsContainerProps = {
    userId: string;
    isCurrentUser: boolean;
};

const SettingsContainer: FC<SettingsContainerProps> = ({ userId, isCurrentUser }) => {
    if (!isCurrentUser) return null;

    if (userId === process.env.DEMO_USER_ID)
        return (
            <div className="text-center text-sm text-gray-500">
                You are currently using the demo account. Log in with a custom account to be able to change your
                credentials.
            </div>
        );

    return (
        <div className="flex flex-col items-center">
            <EditAccountButton />
            <DeleteAccountButton />
        </div>
    );
};

export default SettingsContainer;
