import githubSignIn from "@/actions/auth/modify/github-sign-in";
import SubmitButton from "@/components/general/submit-button";
import { BsGithub } from "@react-icons/all-files/bs/BsGithub";

const GithubLoginButton = () => {
    return (
        <form action={githubSignIn}>
            <SubmitButton
                content={
                    <>
                        <BsGithub />
                        Login With Github
                    </>
                }
                loading={
                    <>
                        <BsGithub />
                        Logging in...
                    </>
                }
            />
        </form>
    );
};

export default GithubLoginButton;
