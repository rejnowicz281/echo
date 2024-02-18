"use client";

import { FC, ReactNode } from "react";
import { useFormStatus } from "react-dom";

export type SubmitButtonProps = {
    className?: string;
    content: ReactNode | string;
    loading?: ReactNode | string;
};

const SubmitButton: FC<SubmitButtonProps> = ({ className, content, loading }) => {
    const { pending } = useFormStatus();

    // if loading is a string, it will be used as the loading text, otherwise 'content' will always be used
    return (
        <button className={className} disabled={pending} type="submit">
            {loading ? (pending ? loading : content) : content}
        </button>
    );
};

export default SubmitButton;
