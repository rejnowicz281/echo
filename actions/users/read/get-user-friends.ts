import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

const getUserFriends = async (id: string) => {
    const actionName = "getUserFriends";

    const supabase = createClient();

    const [recipientFriendsInfo, requesterFriendsError] = await Promise.all([
        supabase
            .from("friendships")
            .select("*, recipient:users!public_friendships_recipient_fkey(*)")
            .eq("requester", id)
            .is("accepted", true),
        supabase
            .from("friendships")
            .select("*, requester:users!public_friendships_requester_fkey(*)")
            .eq("recipient", id)
            .is("accepted", true),
    ]);

    if (recipientFriendsInfo.error || requesterFriendsError.error)
        return actionError(actionName, { error: recipientFriendsInfo.error || requesterFriendsError.error });

    const recipientFriends = recipientFriendsInfo.data;
    const requesterFriends = requesterFriendsError.data;

    const friends = [
        ...recipientFriends.map(({ recipient }) => recipient),
        ...requesterFriends.map(({ requester }) => requester),
    ];

    return actionSuccess(actionName, { friends });
};

export default getUserFriends;
