import googleSignIn from "@/actions/auth/modify/google-sign-in";
import SubmitButton from "@/components/general/submit-button";
import { FcGoogle } from "react-icons/fc";

export default function GoogleLoginButton() {
    return (
        <form action={googleSignIn}>
            <SubmitButton
                content={
                    <>
                        <FcGoogle />
                        Login With Google
                    </>
                }
                loading={
                    <>
                        <FcGoogle />
                        Logging in...
                    </>
                }
            />
        </form>
    );
}
