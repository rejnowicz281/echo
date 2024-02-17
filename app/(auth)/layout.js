import DemoLoginButton from "@/components/auth/demo-login-button";
import GithubLoginButton from "@/components/auth/github-login-button";
import GoogleLoginButton from "@/components/auth/google-login-button";

export default function AuthLayout({ children }) {
    return (
        <div>
            <h1>echo</h1>

            <DemoLoginButton />
            <GithubLoginButton />
            <GoogleLoginButton />

            {children}
        </div>
    );
}
