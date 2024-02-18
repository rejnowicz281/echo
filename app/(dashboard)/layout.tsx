import getCurrentUser from "@/actions/auth/read/get-current-user";
import { AuthProvider } from "@/providers/auth-provider";
import { PresenceProvider } from "@/providers/presence-provider";
import { FC } from "react";
import { RootLayoutProps } from "../layout";

export type DashboardLayoutProps = {
    children: React.ReactNode;
};

const DashboardLayout: FC<RootLayoutProps> = async ({ children }) => {
    const { user } = await getCurrentUser();

    return (
        <AuthProvider user={user}>
            <PresenceProvider>{children}</PresenceProvider>
        </AuthProvider>
    );
};

export default DashboardLayout;
