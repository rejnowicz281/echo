"use client";

import { Button } from "@/components/shadcn/ui/button";
import Image from "next/image";
import { useRef, useState } from "react";
import { FaRegImage } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";

const ImagePicker = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();

            reader.onload = function (event) {
                setSelectedImage(event.target?.result as string);
            };

            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleRemoveImage = () => {
        setSelectedImage(null);
        if (inputRef.current) inputRef.current.value = "";
    };

    return (
        <div className="flex flex-row gap-1 items-start">
            <Button
                variant="ghost"
                type="button"
                className="rounded-[50%] hover:bg-gray-200 p-2"
                onClick={() => inputRef.current?.click()}
            >
                <FaRegImage className="text-2xl" fill="gray" />
            </Button>
            <input
                className="hidden"
                ref={inputRef}
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
            />
            {selectedImage && (
                <>
                    <Button variant="ghost" className="rounded-[50%] hover:bg-gray-200 p-2" onClick={handleRemoveImage}>
                        <MdCancel className="text-2xl" fill="gray" />
                    </Button>
                    <Image className="rounded-2xl" src={selectedImage} alt="Selected" width={200} height={200} />
                </>
            )}
        </div>
    );
};

export default ImagePicker;
