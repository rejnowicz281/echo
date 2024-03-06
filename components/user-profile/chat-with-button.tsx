"use client";

import { Button } from "@/components/shadcn/ui/button";
import useAuthContext from "@/providers/auth-provider";
import { BiMessageSquareDots } from "@react-icons/all-files/bi/BiMessageSquareDots";
import Link from "next/link";
import { FC } from "react";

type ChatWithButtonProps = {
    userId: string;
};

const ChatWithButton: FC<ChatWithButtonProps> = ({ userId }) => {
    const { user } = useAuthContext();

    if (user.id === userId) return null;

    return (
        <div className="flex justify-center flex-row">
            <Button
                asChild
                variant="ghost"
                className="text-teal-500 hover:text-teal-600 flex flex-row items-center gap-2"
            >
                <Link href={`/messages/${userId}`}>
                    <BiMessageSquareDots />
                    Send a message
                </Link>
            </Button>
        </div>
    );
};

export default ChatWithButton;
