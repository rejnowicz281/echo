import { signUp } from "@/actions/auth";
import Link from "next/link";

export default function RegisterPage() {
    return (
        <>
            <h1>Register</h1>
            <form action={signUp}>
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" />
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password" />
                <button type="submit">Continue</button>
            </form>
            <Link href="/login">Login</Link>
        </>
    );
}
