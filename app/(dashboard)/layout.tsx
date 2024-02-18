import getCurrentUser from "@/actions/auth/read/get-current-user";
import WelcomeText from "@/components/general/welcome-text";
import { AuthProvider } from "@/providers/auth-provider";
import { PresenceProvider } from "@/providers/presence-provider";
import Link from "next/link";
import { FC } from "react";

export type DashboardLayoutProps = {
    children: React.ReactNode;
};

const DashboardLayout: FC<DashboardLayoutProps> = async ({ children }) => {
    const { user } = await getCurrentUser();

    return (
        <AuthProvider user={user}>
            <PresenceProvider>
                <WelcomeText />
                <div>
                    <Link href="/">Home</Link>
                </div>
                <div>
                    <Link href="/settings">Settings</Link>
                </div>
                <div>
                    <Link href="/users">All Users</Link>
                </div>
                <div>
                    <Link href="/users/friends">Your friends</Link>
                </div>
                {children}
            </PresenceProvider>
        </AuthProvider>
    );
};

export default DashboardLayout;
