"use client";

import sendMessage from "@/actions/messages/modify/send-message";
import useAuthContext from "@/providers/auth-provider";
import { FC, useRef } from "react";

export type MessageFormProps = {
    recipient: string;
    addOptimisticMessage: (text: string, sender?: string) => void;
};

const MessageForm: FC<MessageFormProps> = ({ recipient, addOptimisticMessage }) => {
    const formRef = useRef<HTMLFormElement>(null);
    const { user } = useAuthContext();

    const handleSend = (formData: FormData) => {
        const textFormData = formData.get("text");

        const text = typeof textFormData === "string" ? textFormData.trim() : null;

        if (text) {
            addOptimisticMessage(text);

            sendMessage(formData);

            formRef.current?.reset();
        }
    };

    return (
        <form ref={formRef} action={handleSend}>
            <input type="hidden" name="sender" value={user.id} />
            <input type="hidden" name="recipient" value={recipient} />
            <input placeholder="Type your message here..." type="text" name="text" />
            <button type="submit">SEND</button>
        </form>
    );
};

export default MessageForm;
