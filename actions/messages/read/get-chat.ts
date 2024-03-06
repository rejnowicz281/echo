import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import generateTimestamps from "@/utils/messages/generate-timestamps";
import { createClient } from "@/utils/supabase/server";

const getChat = async (contactId: string) => {
    const actionName = "getChat";

    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return actionError(actionName, { error: "You must be logged in to proceed" });

    const [
        { data: messages, error: messagesError },
        { data: contact, error: contactError },
        { data: is_friend, error: friendCheckError },
    ] = await Promise.all([
        supabase
            .from("messages")
            .select("*")
            .or(`recipient.eq.${contactId}, sender.eq.${contactId}`)
            .order("created_at", { ascending: true }),
        supabase.from("users").select("*").eq("id", contactId).single(),
        supabase.rpc("check_if_friends", { user1: contactId, user2: user.id }),
    ]);

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
            },
        },
        { logData: false }
    );
};

export default getChat;
