"use client";

import signUp from "@/actions/auth/modify/sign-up";
import PasswordInput from "@/components/general/password-input";
import SubmitButton from "@/components/general/submit-button";
import { Button } from "@/components/shadcn/ui/button";
import { Input } from "@/components/shadcn/ui/input";
import { Label } from "@/components/shadcn/ui/label";
import AvatarPicker from "@/components/users/avatar-picker";
import { VscLoading } from "@react-icons/all-files/vsc/VscLoading";
import { useSearchParams } from "next/navigation";
import { FC } from "react";
import DemoLoginButton from "./demo-login-button";
import GithubLoginButton from "./github-login-button";
import GoogleLoginButton from "./google-login-button";

const RegisterContainer: FC<{ defaultUrl: string }> = ({ defaultUrl }) => {
    const emailError = useSearchParams().get("email-error");
    const passwordError = useSearchParams().get("password-error");
    const firstNameError = useSearchParams().get("first-name-error");
    const lastNameError = useSearchParams().get("last-name-error");
    const generalError = useSearchParams().get("error");

    return (
        <div className="flex-1 mx-auto max-w-[400px] w-full flex flex-col gap-6 justify-center">
            <div className="flex flex-col gap-3 items-center text-center">
                <h2 className="text-3xl font-semibold">Sign Up</h2>
                <p className={generalError ? "text-red-500" : "text-gray-500"}>
                    {generalError
                        ? generalError
                        : "Enter your credentials and choose your avatar below to create your account."}
                </p>
            </div>
            <form className="flex flex-col gap-6" action={signUp}>
                <div className="flex justify-center">
                    <AvatarPicker defaultUrl={defaultUrl} />
                </div>
                <div className="flex flex-col gap-2">
                    <div className="grid grid-cols-4 items-center">
                        <Label className="text-right pr-3" htmlFor="email">
                            Email
                        </Label>
                        <Input
                            className="col-span-3 focus-visible:ring-slate-200"
                            type="email"
                            name="email"
                            id="email"
                            placeholder="name@example.com"
                        />
                        {emailError && (
                            <div className="col-start-2 pl-3 py-1 col-span-3 text-red-500 text-sm">{emailError}</div>
                        )}
                    </div>
                    <div className="grid grid-cols-4 items-center">
                        <Label className="text-right pr-3" htmlFor="first_name">
                            First Name
                        </Label>
                        <Input
                            className="col-span-3 focus-visible:ring-slate-200"
                            name="first_name"
                            id="first_name"
                            placeholder="John"
                        />
                        {firstNameError && (
                            <div className="col-start-2 pl-3 py-1 col-span-3 text-red-500 text-sm">
                                {firstNameError}
                            </div>
                        )}
                    </div>
                    <div className="grid grid-cols-4 items-center">
                        <Label className="text-right pr-3" htmlFor="last_name">
                            Last Name
                        </Label>
                        <Input
                            className="col-span-3 focus-visible:ring-slate-200"
                            name="last_name"
                            id="last_name"
                            placeholder="Doe"
                        />
                        {lastNameError && (
                            <div className="col-start-2 pl-3 py-1 col-span-3 text-red-500 text-sm">{lastNameError}</div>
                        )}
                    </div>
                    <div className="grid grid-cols-4 items-center">
                        <Label className="text-right pr-3" htmlFor="password">
                            Password
                        </Label>
                        <PasswordInput className="col-span-3" placeholder="Must have at least 6 characters" />
                        {passwordError && (
                            <div className="col-start-2 pl-3 py-1 col-span-3 text-red-500 text-sm">{passwordError}</div>
                        )}
                    </div>
                </div>
                <Button asChild className="font-semibold">
                    <SubmitButton content="Sign Up with Email" loading={<VscLoading className="animate-spin" />} />
                </Button>
            </form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 font-semibold tracking-widest text-gray-500">OR CONTINUE WITH</span>
                </div>
            </div>
            <div className="flex flex-col gap-3">
                <DemoLoginButton />
                <GithubLoginButton />
                <GoogleLoginButton />
            </div>
        </div>
    );
};

export default RegisterContainer;
