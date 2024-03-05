"use client";

import sendMessage from "@/actions/messages/modify/send-message";
import useAuthContext from "@/providers/auth-provider";
import { FiSend } from "@react-icons/all-files/fi/FiSend";
import { useRef } from "react";
import useChatContext from "./chat-provider";

const MessageForm = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const { user } = useAuthContext();
    const { contact, addOptimisticMessage } = useChatContext();

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
        <form className="border-t border-t-gray-100 flex flex-wrap justify-center" ref={formRef} action={handleSend}>
            <input type="hidden" name="sender" value={user.id} />
            <input type="hidden" name="recipient" value={contact.id} />
            <input
                className="flex-1 p-7 outline-none"
                placeholder="Type your message here..."
                type="text"
                name="text"
            />
            <button className="hover:text-gray-500 transition-colors px-4" type="submit">
                <FiSend className="text-3xl" />
            </button>
        </form>
    );
};

export default MessageForm;
