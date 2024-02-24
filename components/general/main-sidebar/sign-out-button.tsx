import signOut from "@/actions/auth/modify/sign-out";
import { Button } from "@/components/shadcn/ui/button";
import { BsPersonRaisedHand } from "react-icons/bs";
import SubmitButton from "../submit-button";

const SignOutButton = () => {
    return (
        <form className="flex" action={signOut}>
            <Button className="rounded-2xl flex-1 flex flex-row gap-2 items-center border" variant="ghost" asChild>
                <SubmitButton
                    content={
                        <>
                            <BsPersonRaisedHand />
                            Sign Out
                        </>
                    }
                    loading={
                        <>
                            <BsPersonRaisedHand />
                            Signing Out...
                        </>
                    }
                />
            </Button>
        </form>
    );
};

export default SignOutButton;
