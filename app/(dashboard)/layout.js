import getCurrentUser from "@/actions/auth/read/get-current-user";
import { AuthProvider } from "@/providers/auth-provider";
import { PresenceProvider } from "@/providers/presence-provider";

export default async function DashboardLayout({ children }) {
    const { user } = await getCurrentUser();

    return (
        <AuthProvider user={user}>
            <PresenceProvider>{children}</PresenceProvider>
        </AuthProvider>
    );
}
