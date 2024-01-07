import { useState } from "react";

export default function AsyncButton({ className, onClick, content, loading, type = "button" }) {
    const [pending, setPending] = useState(false);

    async function handleClick() {
        setPending(true);
        await onClick();
        setPending(false);
    }

    return (
        <button className={className} type={type} onClick={handleClick} disabled={pending}>
            {pending ? loading : content}
        </button>
    );
}
