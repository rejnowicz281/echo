import signIn from "@/actions/auth/modify/sign-in";
import FormMessages from "@/components/auth/form-messages";
import SubmitButton from "@/components/general/submit-button";
import Link from "next/link";

const LoginContainer = () => {
    return (
        <div>
            <h2>Login</h2>
            <FormMessages />
            <form action={signIn}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="Enter your email" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="Enter your password" />
                </div>
                <SubmitButton content="Continue" loading="Proceeding..." />
            </form>
            <div>
                Don't have an account? <Link href="/register">Register</Link>
            </div>
        </div>
    );
};

export default LoginContainer;
