import { signIn } from "@/actions/auth";
import Link from "next/link";

export default function LoginPage() {
    return (
        <>
            <h1>Login</h1>
            <form action={signIn}>
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" />
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password" />
                <button type="submit">Continue</button>
            </form>
            <Link href="/register">Register</Link>
        </>
    );
}
