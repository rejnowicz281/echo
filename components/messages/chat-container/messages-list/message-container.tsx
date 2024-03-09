import deleteMessage from "@/actions/messages/modify/delete-message";
import PresenceAvatar from "@/components/general/presence-avatar";
import SubmitButton from "@/components/general/submit-button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/shadcn/ui/tooltip";
import useAuthContext from "@/providers/auth-provider";
import { Message } from "@/types/message";
import userDisplayName from "@/utils/general/user-display-name";
import formatMessageDate from "@/utils/messages/format-message-date";
import { AiOutlineLoading } from "@react-icons/all-files/ai/AiOutlineLoading";
import { RiDeleteBinLine } from "@react-icons/all-files/ri/RiDeleteBinLine";
import clsx from "clsx";
import { FC } from "react";
import useChatContext from "../chat-provider";

type MessageContainerProps = {
    message: Message;
};

const MessageContainer: FC<MessageContainerProps> = ({ message }) => {
    const { contact, deleteOptimisticMessage } = useChatContext();
    const { user } = useAuthContext();

    const getSenderById = (id: string) => {
        return id === user.id ? user : contact;
    };

    const sender = getSenderById(message.sender);

    const senderDisplayName = userDisplayName(sender);

    const isSender = message.sender === user.id;

    const handleDelete = (formData: FormData) => {
        const idFormData = formData.get("id");
        const id = typeof idFormData === "string" ? idFormData : "";
        if (id) {
            deleteOptimisticMessage(id);
            deleteMessage(formData);
        }
    };

    return (
        <div className={clsx("group flex p-5 gap-4 flex-wrap", isSender ? "flex-row-reverse" : "flex-row")}>
            <div className="flex items-center justify-center">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger className="cursor-default">
                            <PresenceAvatar
                                avatarSize={50}
                                src={sender.avatar_url}
                                alt={senderDisplayName}
                                userId={message.sender}
                            />
                        </TooltipTrigger>
                        <TooltipContent>{senderDisplayName}</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div
                            className={clsx(
                                "p-4 rounded max-w-[500px]",
                                isSender ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
                            )}
                        >
                            {message.text}
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>{formatMessageDate(message.created_at)}</TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <div className="self-center">
                {message.loading ? (
                    <AiOutlineLoading className="animate-spin" />
                ) : (
                    message.sender === user.id && (
                        <form action={handleDelete}>
                            <input type="hidden" name="id" value={message.id} />
                            <SubmitButton
                                className="text-gray-500 opacity-0 transition-opacity group-hover:opacity-100"
                                content={<RiDeleteBinLine />}
                                loading={<AiOutlineLoading className="animate-spin" />}
                            />
                        </form>
                    )
                )}
            </div>
        </div>
    );
};

export default MessageContainer;
