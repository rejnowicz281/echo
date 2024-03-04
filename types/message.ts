export type Message = {
    id: string;
    created_at: string;
    text: string;
    sender: string;
    recipient?: string;
    timestamp?: boolean;
    loading?: boolean;
};
