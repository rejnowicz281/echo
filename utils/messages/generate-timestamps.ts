import { Message } from "@/types/message";

export default function generateTimestamps(messages: Message[]) {
    let previousMessage: Message | null = null;

    messages.forEach((message) => {
        assignTimestamp(message, previousMessage);
        previousMessage = message;
    });
}

// if a message was sent at least 10 minutes after the previous one, show a timestamp.
// if it's the first message, show a timestamp.
export function assignTimestamp(message: Message, previousMessage: Message | null) {
    if (!message) return;

    const timestamp = new Date(message.created_at).getTime();

    const previousMessageTimestamp = previousMessage && new Date(previousMessage.created_at).getTime();
    if (!previousMessageTimestamp || timestamp - previousMessageTimestamp > 600000) message.timestamp = true;
}
