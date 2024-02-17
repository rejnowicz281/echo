import { revalidatePath as revalidate } from "next/cache";
import { redirect } from "next/navigation";

export default function actionResponse(
    success = true,
    actionName,
    additionalData = {},
    revalidatePath = null,
    redirectPath = null
) {
    const data = {
        action: actionName,
        success,
        ...additionalData,
    };
    if (success) console.log(data);
    else console.error(data);

    if (redirectPath) redirect(redirectPath);
    if (revalidatePath) revalidate(revalidatePath, "page");

    return data;
}
