"use client";

import { FaXmark } from "@react-icons/all-files/fa6/FaXmark";
import { FC, useRef, useState } from "react";

type ImagePickerProps = {
    name: string;
    id: string;
};

const ImagePicker: FC<ImagePickerProps> = ({ name, id }) => {
    const [imageIsSet, setImageIsSet] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = () => {
        setImageIsSet(true);
    };

    const handleCancelImage = () => {
        setImageIsSet(false);
        if (inputRef.current) inputRef.current.value = "";
    };

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
};

export default ImagePicker;
