import signUp from "@/actions/auth/modify/sign-up";
import FormMessages from "@/components/auth/form-messages";
import ImagePicker from "@/components/general/image-picker";
import SubmitButton from "@/components/general/submit-button";
import Link from "next/link";

const RegisterContainer = () => {
    return (
        <div>
            <h2>Register</h2>
            <FormMessages />
            <form action={signUp}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="Enter your email" />
                </div>
                <div>
                    <div>
                        <label htmlFor="first_name">First Name</label>
                        <input type="text" id="first_name" name="first_name" placeholder="Enter first name" />
                    </div>
                    <div>
                        <label htmlFor="last_name">Last Name</label>
                        <input type="text" id="last_name" name="last_name" placeholder="Enter last name" />
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="Enter your password" />
                    </div>
                    <div>
                        <label htmlFor="password_confirm">Confirm Password</label>
                        <input
                            type="password"
                            id="password_confirm"
                            name="password_confirm"
                            placeholder="Confirm your password"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="avatar">Avatar (optional)</label>
                    <ImagePicker id="avatar" name="avatar" />
                </div>
                <SubmitButton content="Continue" loading="Proceeding..." />
            </form>
            <div>
                Already have an account? <Link href="/login">Log In</Link>
            </div>
        </div>
    );
};

export default RegisterContainer;
