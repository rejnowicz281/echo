import RegisterContainer from "@/components/auth/register-container";
import { Button } from "@/components/shadcn/ui/button";
import { BsSoundwave } from "@react-icons/all-files/bs/BsSoundwave";
import Link from "next/link";

const RegisterPage = () => {
    return (
        <div className="p-4 flex-1 flex flex-col">
            <div className="flex justify-between items-center">
                <div className="flex gap-3 text-3xl items-center">
                    <BsSoundwave />
                    <h1 className="tracking-widest">echo</h1>
                </div>
                <Button asChild variant="ghost" className="text-xl">
                    <Link href="/login">Login</Link>
                </Button>
            </div>
            <div className="flex-1 flex flex-col">
                <RegisterContainer defaultUrl={process.env.DEFAULT_AVATAR_URL!} />
            </div>
        </div>
    );
};

export default RegisterPage;
