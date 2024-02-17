import demoLogin from "@/actions/auth/modify/demo-login";
import SubmitButton from "@/components/general/submit-button";
import { BiSolidSkipNextCircle } from "react-icons/bi";

export default function DemoLoginButton() {
    return (
        <form action={demoLogin}>
            <SubmitButton
                content={
                    <>
                        <BiSolidSkipNextCircle />
                        Fast Login
                    </>
                }
                loading={
                    <>
                        <BiSolidSkipNextCircle />
                        Logging in...
                    </>
                }
            />
        </form>
    );
}
