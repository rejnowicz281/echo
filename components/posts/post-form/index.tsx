import addPost from "@/actions/posts/modify/add-post";
import SubmitButton from "@/components/general/submit-button";
import { Button } from "@/components/shadcn/ui/button";
import { Textarea } from "@/components/shadcn/ui/textarea";
import { Post } from "@/types/posts";
import { FC } from "react";
import { VscLoading } from "react-icons/vsc";
import ImagePicker from "./image-picker";

export type PostFormProps = {
    content?: string;
    parent_post?: string;
    placeholder?: string;
    initialPost?: Post;
    action?: (formData: FormData) => Promise<void>;
};

const PostForm: FC<PostFormProps> = ({
    content = "Post",
    parent_post,
    placeholder = "What's going on?",
    initialPost,
    action = addPost,
}) => {
    return (
        <form className="flex flex-col gap-2" action={action}>
            {parent_post && <input type="hidden" name="parent_post" value={parent_post} />}
            <Textarea
                className="focus-visible:ring-slate-200"
                name="text"
                defaultValue={initialPost?.text}
                id="text"
                placeholder={placeholder}
            ></Textarea>
            <div className="flex flex-row gap-2 justify-end">
                <ImagePicker initialImage={initialPost?.image_url} />
                <Button className="w-[90px] rounded-2xl border font-bold" variant="ghost" asChild>
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
        </form>
    );
};

export default PostForm;
