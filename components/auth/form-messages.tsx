"use client";

import { useSearchParams } from "next/navigation";

const FormMessages = () => {
    const messages = useSearchParams().getAll("message");

    if (!messages.length) return null;

    return (
        <div>
            {messages.map((message, idx) => (
                <li key={idx}>{message}</li>
            ))}
        </div>
    );
};

export default FormMessages;
