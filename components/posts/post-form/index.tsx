"use client";

import addPost from "@/actions/posts/modify/add-post";
import SubmitButton from "@/components/general/submit-button";
import { Button } from "@/components/shadcn/ui/button";
import { Textarea } from "@/components/shadcn/ui/textarea";
import { ActionResponse } from "@/types/action-response";
import { Post } from "@/types/posts";
import { VscLoading } from "@react-icons/all-files/vsc/VscLoading";
import { FC, useRef, useState } from "react";
import ImagePicker from "./image-picker";

type PostFormProps = {
    content?: string;
    parent_post?: string;
    placeholder?: string;
    initialPost?: Post;
    action?: (formData: FormData) => Promise<ActionResponse>;
};

const PostForm: FC<PostFormProps> = ({
    content = "Post",
    parent_post,
    placeholder = "What's going on?",
    initialPost,
    action = addPost,
}) => {
    const [error, setError] = useState<string | null>(null);
    const [hideImage, setHideImage] = useState<boolean>(false);
    const formRef = useRef<HTMLFormElement>(null);

    const handleAction = async (formData: FormData) => {
        const text = formData.get("text");
        const imageFile = formData.get("image");
        const imageUploadDisabled = formData.get("image_upload_disabled");

        if (!text && (!imageFile || (imageFile instanceof File && imageFile.size === 0)))
            setError("Text and image cannot both be empty.");
        else {
            const res = await action(formData);

            if (res.error) setError(res.error);
            else {
                if (imageFile instanceof File && imageFile.type.startsWith("image") && !imageUploadDisabled)
                    setHideImage(true);
                formRef.current?.reset();
            }
        }
    };

    return (
        <form ref={formRef} onSubmit={() => setError(null)} className="flex flex-col gap-2" action={handleAction}>
            {parent_post && <input type="hidden" name="parent_post" value={parent_post} />}
            <Textarea
                className="focus-visible:ring-slate-200"
                name="text"
                defaultValue={initialPost?.text}
                id="text"
                placeholder={placeholder}
            ></Textarea>
            <div className="flex flex-row gap-2">
                <p className="text-sm text-red-500 flex-1">{error}</p>
                <div className="flex flex-row gap-2 justify-end">
                    <ImagePicker
                        hideImage={hideImage}
                        setHideImage={setHideImage}
                        initialImage={initialPost?.image_url}
                    />
                    <Button className="w-[100px] rounded-2xl border font-bold shrink-0" variant="ghost" asChild>
                        <SubmitButton
                            content={content}
                            loading={
                                <>
                                    {content}
                                    <VscLoading className="ms-2 shrink-0 animate-spin" />
                                </>
                            }
                        />
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default PostForm;
