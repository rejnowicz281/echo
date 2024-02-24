import deleteAccount from "@/actions/auth/modify/delete-account";
import SubmitButton from "../general/submit-button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../shadcn/ui/alert-dialog";
import { Button } from "../shadcn/ui/button";

const DeleteAccountButton = () => {
    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="ghost" className="text-red-500 hover:text-red-600">
                        Delete your account
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your account and all of your
                            data.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <form action={deleteAccount}>
                            <AlertDialogAction asChild>
                                <SubmitButton content="Delete My Account" loading="Deleting..." />
                            </AlertDialogAction>
                        </form>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default DeleteAccountButton;
