import demoLogin from "@/actions/auth/modify/demo-login";
import SubmitButton from "@/components/general/submit-button";
import { BiSolidSkipNextCircle } from "react-icons/bi";

const DemoLoginButton = () => {
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
};

export default DemoLoginButton;
