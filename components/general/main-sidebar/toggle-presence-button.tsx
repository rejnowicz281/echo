"use client";

import { Button } from "@/components/shadcn/ui/button";
import usePresenceContext from "@/providers/presence-provider";
import { FaEye } from "@react-icons/all-files/fa/FaEye";
import { FaEyeSlash } from "@react-icons/all-files/fa/FaEyeSlash";

const TogglePresenceButton = () => {
    const { togglePresence, presenceEnabled } = usePresenceContext();

    return (
        <Button
            variant="ghost"
            className="rounded-2xl flex flex-row gap-2 items-center border"
            onClick={togglePresence}
        >
            {presenceEnabled ? (
                <>
                    <FaEyeSlash />
                    Disable
                </>
            ) : (
                <>
                    <FaEye />
                    Enable
                </>
            )}{" "}
            Presence
        </Button>
    );
};

export default TogglePresenceButton;
