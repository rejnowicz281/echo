import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

const getAllFriends = async () => {
    const actionName = "getAllFriends";

    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return actionError(actionName, { error: "You must be logged in" });

    const { data: friendships, error } = await supabase
        .from("friendships")
        .select(
            "*, requester: users!public_friendships_requester_fkey(*), recipient: users!public_friendships_recipient_fkey(*)"
        )
        .or(`requester.eq.${user.id}, recipient.eq.${user.id})`)
        .order("created_at", { ascending: false });

    if (error) return actionError(actionName, error);

    const friends = friendships.map((friendship) => {
        if (friendship.requester.id === user.id) {
            return { ...friendship.recipient, accepted: friendship.accepted };
        } else {
            return { ...friendship.requester, accepted: friendship.accepted };
        }
    });

    return actionSuccess(actionName, { friends });
};

export default getAllFriends;
