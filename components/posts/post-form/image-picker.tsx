"use client";

import { Button } from "@/components/shadcn/ui/button";
import Image from "next/image";
import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from "react";
import { FaRegImage } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";

export type ImagePickerProps = {
    initialImage?: string;
    hideImage: boolean;
    setHideImage: Dispatch<SetStateAction<boolean>>;
};

const ImagePicker: FC<ImagePickerProps> = ({ initialImage, hideImage, setHideImage }) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(initialImage || null);

    // if initial image is present and it hasn't been changed or removed, this will be true
    const [imageUploadDisabled, setImageUploadDisabled] = useState<boolean>(Boolean(initialImage));

    useEffect(() => {
        if (hideImage) {
            setSelectedImage(null);
            setHideImage(false);
        }
    }, [hideImage]);

    const inputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImageUploadDisabled(false);

        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();

            reader.onload = function (event) {
                setSelectedImage(event.target?.result as string);
            };

            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleRemoveImage = () => {
        setImageUploadDisabled(false);

        setSelectedImage(null);
        if (inputRef.current) inputRef.current.value = "";
    };

    return (
        <div className="flex flex-row gap-1 items-start">
            {selectedImage && (
                <>
                    <div className="relative">
                        <Image
                            src={selectedImage}
                            alt="Post Image"
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="rounded-lg w-full h-auto"
                        />
                    </div>
                    <Button variant="ghost" className="rounded-[50%] hover:bg-gray-200 p-2" onClick={handleRemoveImage}>
                        <MdCancel className="text-2xl" fill="gray" />
                    </Button>
                </>
            )}
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
            {imageUploadDisabled && <input type="hidden" name="image_upload_disabled" value="true" />}
        </div>
    );
};

export default ImagePicker;
