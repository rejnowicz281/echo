import getCurrentUser from "@/actions/auth/read/get-current-user";
import MainSidebar from "@/components/general/main-sidebar";
import { AuthProvider } from "@/providers/auth-provider";
import { PresenceProvider } from "@/providers/presence-provider";
import { FC } from "react";

export type DashboardLayoutProps = {
    children: React.ReactNode;
};

const DashboardLayout: FC<DashboardLayoutProps> = async ({ children }) => {
    const { user } = await getCurrentUser();

    return (
        <AuthProvider user={user}>
            <PresenceProvider>
                <div className="flex flex-row flex-1">
                    <div className="relative flex basis-[400px] shrink-0">
                        <div className="absolute overflow-auto inset-0 flex-1 flex flex-col">
                            <MainSidebar />
                        </div>
                    </div>
                    <div className="relative flex flex-1">
                        <div className="absolute overflow-auto inset-0 flex-1 flex flex-col">{children}</div>
                    </div>
                </div>
            </PresenceProvider>
        </AuthProvider>
    );
};

export default DashboardLayout;
