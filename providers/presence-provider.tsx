"use client";

import useAuthContext from "@/providers/auth-provider";
import removeDuplicates from "@/utils/general/remove-duplicates";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { RealtimePresenceState } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { FC, createContext, useContext, useEffect, useState } from "react";

export type PresenceContextType = {
    togglePresence: () => void;
    loggedUsers: string[];
    setLoggedUsers: React.Dispatch<React.SetStateAction<string[]>>;
    presenceEnabled: boolean;
    setPresenceEnabled: React.Dispatch<React.SetStateAction<boolean>>;
};

export type PresenceProviderProps = {
    children: React.ReactNode;
};

export type PresenceStateType = {
    [key: string]: [
        {
            user_id: string;
            presence_ref: string;
        }
    ];
};

const PresenceContext = createContext<PresenceContextType | null>(null);

export const PresenceProvider: FC<PresenceProviderProps> = ({ children }) => {
    const router = useRouter();
    const supabase = createClientComponentClient();
    const { user } = useAuthContext();
    const [loggedUsers, setLoggedUsers] = useState<string[]>([]);
    const [presenceEnabled, setPresenceEnabled] = useState<boolean>(true);

    useEffect(() => {
        const presenceChannel = supabase.channel("presence#public");

        presenceChannel
            .on("presence", { event: "sync" }, () => {
                const newState: RealtimePresenceState<PresenceStateType> = presenceChannel.presenceState();
                console.log("sync", newState);
                const newStateArray = Object.values(newState).map((arr) => arr[0].user_id);
                const pushArray = removeDuplicates(newStateArray);
                setLoggedUsers(pushArray);
            })
            .subscribe(async (status) => {
                if (status !== "SUBSCRIBED") {
                    return;
                }

                if (presenceEnabled && user) {
                    const presenceTrackStatus = await presenceChannel.track({ user_id: user.id });
                    console.log("Presence Track Status -", presenceTrackStatus);
                }
            });

        return () => {
            presenceChannel.unsubscribe();
            presenceChannel.untrack();
        };
    }, [supabase, router, presenceEnabled]);

    const togglePresence = () => setPresenceEnabled(!presenceEnabled);

    return (
        <PresenceContext.Provider
            value={{
                togglePresence,
                loggedUsers,
                setLoggedUsers,
                presenceEnabled,
                setPresenceEnabled,
            }}
        >
            {children}
        </PresenceContext.Provider>
    );
};

const usePresenceContext = () => {
    const context = useContext(PresenceContext);

    if (!context) throw new Error("usePresenceContext must be used within a PresenceContext Provider");

    return context;
};

export default usePresenceContext;
