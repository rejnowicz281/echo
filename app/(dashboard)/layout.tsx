import getCurrentUser from "@/actions/auth/read/get-current-user";
import MainSidebar from "@/components/general/main-sidebar";
import { AuthProvider } from "@/providers/auth-provider";
import { PresenceProvider } from "@/providers/presence-provider";
import { FC } from "react";

type DashboardLayoutProps = {
    children: React.ReactNode;
};

const DashboardLayout: FC<DashboardLayoutProps> = async ({ children }) => {
    const { user } = await getCurrentUser();

    return (
        <AuthProvider user={user}>
            <PresenceProvider>
                <div className="flex flex-col lg:flex-row-reverse flex-1">
                    <div className="relative flex flex-1">
                        <div id="main-section" className="absolute overflow-auto inset-0 flex-1 flex flex-col">
                            <div id="main-children-section" className="flex-1 flex flex-col">
                                {children}
                            </div>
                        </div>
                    </div>
                    <div className="lg:relative lg:flex lg:basis-[400px] lg:shrink-0">
                        <div className="lg:absolute lg:overflow-auto lg:inset-0 lg:flex-1 lg:flex lg:flex-col">
                            <MainSidebar />
                        </div>
                    </div>
                </div>
            </PresenceProvider>
        </AuthProvider>
    );
};

export default DashboardLayout;
