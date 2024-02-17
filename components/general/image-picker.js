"use client";

import { useRef, useState } from "react";
import { FaXmark } from "react-icons/fa6";

export default function ImagePicker({ name, id }) {
    const [imageIsSet, setImageIsSet] = useState(false);
    const inputRef = useRef(null);

    function handleImageChange(e) {
        setImageIsSet(true);
    }

    function handleCancelImage() {
        setImageIsSet(false);
        inputRef.current.value = "";
    }

    return (
        <div>
            <input name={name} id={id} type="file" ref={inputRef} onChange={handleImageChange} />
            {imageIsSet && (
                <button type="button" onClick={handleCancelImage}>
                    <FaXmark />
                </button>
            )}
        </div>
    );
}
