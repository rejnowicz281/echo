"use client";

import useAuthContext from "@/providers/auth-provider";
import { User } from "@/types/users";
import { FC } from "react";
import DeleteAccountButton from "./delete-account-button";
import EditAccountButton from "./edit-account-button";

export type SettingsContainerProps = {
    user: User;
};

const SettingsContainer: FC<SettingsContainerProps> = ({ user }) => {
    const authData = useAuthContext();

    const currentUser = authData.user;

    if (currentUser.id !== user.id) return null;

    return (
        <div className="flex flex-col items-center">
            <EditAccountButton />
            <DeleteAccountButton />
        </div>
    );
};

export default SettingsContainer;
