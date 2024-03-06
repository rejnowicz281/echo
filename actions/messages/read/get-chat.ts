import getCurrentUser from "@/actions/auth/read/get-current-user";
import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import generateTimestamps from "@/utils/messages/generate-timestamps";
import { createClient } from "@/utils/supabase/server";

const getChat = async (contactId: string) => {
    const actionName = "getChat";

    const supabase = createClient();

    const { user } = await getCurrentUser();

    const isCurrentUser = user.id === contactId;

    const messagesInfo = () =>
        supabase
            .from("messages")
            .select("*")
            .or(
                `and(sender.eq.${contactId}, recipient.eq.${user.id}), and(sender.eq.${user.id}, recipient.eq.${contactId})`
            )
            .order("created_at", { ascending: true });

    const contactInfo = () =>
        isCurrentUser ? { data: user, error: null } : supabase.from("users").select("*").eq("id", contactId).single();

    const friendCheckInfo = () =>
        isCurrentUser
            ? { data: false, error: null }
            : supabase.rpc("check_if_friends", { user1: contactId, user2: user.id });

    const [
        { data: messages, error: messagesError },
        { data: contact, error: contactError },
        { data: is_friend, error: friendCheckError },
    ] = await Promise.all([messagesInfo(), contactInfo(), friendCheckInfo()]);

    if (messagesError || contactError || friendCheckError)
        return actionError(actionName, {
            error: messagesError?.message || contactError?.message || friendCheckError?.message,
        });

    if (messages) generateTimestamps(messages);

    return actionSuccess(
        actionName,
        {
            messages,
            contact: {
                ...contact,
                is_friend,
                is_current_user: isCurrentUser,
            },
        },
        { logData: false }
    );
};

export default getChat;
