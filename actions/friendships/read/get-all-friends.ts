import { User } from "@/types/users";
import actionError from "@/utils/actions/action-error";
import { ActionResponse } from "@/utils/actions/action-response";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

export type FriendType = User & { friendship_id: string };

export type FriendsActionResponse = ActionResponse & {
    acceptedFriends?: FriendType[];
    sentRequests?: FriendType[];
    receivedRequests?: FriendType[];
};

const getAllFriends = async (): Promise<FriendsActionResponse> => {
    const actionName = "getAllFriends";

    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return actionError(actionName, { error: "You must be logged in" });

    const [sentRequestsInfo, receivedRequestsInfo] = await Promise.all([
        supabase
            .from("friendships")
            .select("*, recipient:users!public_friendships_recipient_fkey(*)")
            .eq("requester", user.id),
        supabase
            .from("friendships")
            .select("*, requester:users!public_friendships_requester_fkey(*)")
            .eq("recipient", user.id),
    ]);

    if (sentRequestsInfo.error || receivedRequestsInfo.error)
        return actionError(actionName, { error: sentRequestsInfo.error || receivedRequestsInfo.error });

    const sentRequests = sentRequestsInfo.data;
    const receivedRequests = receivedRequestsInfo.data;

    let acceptedFriends = [];

    // go through sent requests and move them to accepted friends if they are accepted
    for (let i = 0; i < sentRequests.length; i++) {
        const request = sentRequests[i];

        if (request.accepted) {
            acceptedFriends.push({ ...request.recipient, friendship_id: request.id });
            sentRequests.splice(i, 1);
            i--;
        } else sentRequests[i] = { ...request.recipient, friendship_id: request.id };
    }

    // go through received requests and move them to accepted friends if they are accepted
    for (let i = 0; i < receivedRequests.length; i++) {
        const request = receivedRequests[i];

        if (request.accepted) {
            acceptedFriends.push({ ...request.requester, friendship_id: request.id });
            receivedRequests.splice(i, 1);
            i--;
        } else receivedRequests[i] = { ...request.requester, friendship_id: request.id };
    }

    return actionSuccess(actionName, { acceptedFriends, sentRequests, receivedRequests }, { logData: false });
};

export default getAllFriends;
