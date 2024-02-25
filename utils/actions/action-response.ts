import { revalidatePath as revalidate } from "next/cache";
import { redirect } from "next/navigation";

export type ActionResponse = {
    action: string;
    success: boolean;
    [key: string]: any;
};

const actionResponse = (
    success = true,
    actionName: string,
    additionalData: Record<string, any> = {},
    revalidatePath: string | null = null,
    redirectPath: string | null = null
) => {
    const data: ActionResponse = {
        action: actionName,
        success,
        ...additionalData,
    };
    if (process.env.NODE_ENV !== "production") {
        if (success) console.log(data);
        else console.error(data);
    }

    if (redirectPath) redirect(redirectPath);
    if (revalidatePath) revalidate(revalidatePath, "page");

    return data;
};

export default actionResponse;
