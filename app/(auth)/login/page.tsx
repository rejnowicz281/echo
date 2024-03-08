import LoginContainer from "@/components/auth/login-container";
import { Button } from "@/components/shadcn/ui/button";
import { BsSoundwave } from "@react-icons/all-files/bs/BsSoundwave";
import Link from "next/link";

const LoginPage = () => {
    return (
        <div className="p-4 flex-1 flex flex-col">
            <div className="flex justify-between items-center">
                <div className="flex gap-3 text-3xl items-center">
                    <BsSoundwave />
                    <h1 className="tracking-widest">echo</h1>
                </div>
                <Button asChild variant="ghost" className="text-xl">
                    <Link href="/register">Register</Link>
                </Button>
            </div>
            <div className="flex-1 flex flex-col">
                <LoginContainer />
            </div>
        </div>
    );
};

export default LoginPage;
