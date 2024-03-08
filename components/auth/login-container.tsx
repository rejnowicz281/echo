"use client";

import signIn from "@/actions/auth/modify/sign-in";
import PasswordInput from "@/components/general/password-input";
import SubmitButton from "@/components/general/submit-button";
import { Button } from "@/components/shadcn/ui/button";
import { Input } from "@/components/shadcn/ui/input";
import { Label } from "@/components/shadcn/ui/label";
import { VscLoading } from "@react-icons/all-files/vsc/VscLoading";
import { useSearchParams } from "next/navigation";
import DemoLoginButton from "./demo-login-button";
import GithubLoginButton from "./github-login-button";
import GoogleLoginButton from "./google-login-button";

const LoginContainer = () => {
    const error = useSearchParams().get("error");

    return (
        <div className="flex-1 mx-auto max-w-[400px] w-full flex flex-col gap-6 justify-center">
            <div className="flex flex-col gap-3 items-center text-center">
                <h2 className="text-3xl font-semibold">Sign In</h2>
                <p className={error ? "text-red-500 font-semibold" : "text-gray-500"}>
                    {error ? error : "Enter your credentials below to sign in."}
                </p>
            </div>
            <form className="flex flex-col gap-6" action={signIn}>
                <div className="flex flex-col gap-2">
                    <div className="grid grid-cols-4 items-center gap-3">
                        <Label className="text-right" htmlFor="email">
                            Email
                        </Label>
                        <Input
                            className="col-span-3 focus-visible:ring-slate-200"
                            type="email"
                            name="email"
                            id="email"
                            placeholder="name@example.com"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-3">
                        <Label className="text-right" htmlFor="password">
                            Password
                        </Label>
                        <PasswordInput className="col-span-3" />
                    </div>
                </div>
                <Button asChild className="font-semibold">
                    <SubmitButton content="Sign In with Email" loading={<VscLoading className="animate-spin" />} />
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

export default LoginContainer;
