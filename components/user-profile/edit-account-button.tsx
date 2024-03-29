"use client";

import updateAccount from "@/actions/auth/modify/update-account";
import SubmitButton from "@/components/general/submit-button";
import { Button } from "@/components/shadcn/ui/button";
import { Checkbox } from "@/components/shadcn/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import { Input } from "@/components/shadcn/ui/input";
import { Label } from "@/components/shadcn/ui/label";
import AvatarPicker from "@/components/users/avatar-picker";
import useAuthContext from "@/providers/auth-provider";
import { MdEdit } from "@react-icons/all-files/md/MdEdit";
import Image from "next/image";
import { useState } from "react";
import PasswordInput from "../general/password-input";

const EditAccountButton = () => {
    const { user } = useAuthContext();

    const [error, setError] = useState<string | null>(null);

    const isEmailProvider = user.provider === "email";

    const handleUpdate = async (formData: FormData) => {
        const password = formData.get("password");

        if (typeof password === "string" && password.length > 1 && password.length < 6)
            setError("Password should be at least 6 characters.");
        else {
            const res = await updateAccount(formData);

            if (res.error) setError(res.error);
        }
    };

    return (
        <Dialog onOpenChange={() => setError(null)}>
            <DialogTrigger asChild>
                <Button variant="ghost" className="text-teal-500 hover:text-teal-600 flex flex-row items-center gap-2">
                    <MdEdit />
                    Edit Account
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Account</DialogTitle>
                    <DialogDescription>
                        {isEmailProvider
                            ? "Here you can change your name, password, and avatar. To update the avatar, simply click on it. You can leave any field blank if you don't want to change it."
                            : "Here you can change your name. Only users who signed up with an email provider can change their password and avatar."}{" "}
                        Click Save when you're done.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={() => setError(null)} action={handleUpdate}>
                    <div className="flex flex-col items-center gap-3">
                        {isEmailProvider ? (
                            <AvatarPicker defaultUrl={user.avatar_url} />
                        ) : (
                            <Image
                                src={user.avatar_url}
                                width={100}
                                height={100}
                                alt="Your avatar"
                                className="rounded-[50%]"
                            />
                        )}
                        <div className="text-gray-500">
                            {!user.first_name && !user.last_name
                                ? "No full name provided..."
                                : `${user.first_name} ${user.last_name}`}
                        </div>
                    </div>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="first_name" className="text-right">
                                First Name
                            </Label>
                            <Input
                                id="first_name"
                                name="first_name"
                                placeholder={user.first_name}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="last_name" className="text-right">
                                Last Name
                            </Label>
                            <Input
                                id="last_name"
                                name="last_name"
                                placeholder={user.last_name}
                                className="col-span-3"
                            />
                        </div>
                        {isEmailProvider && (
                            <>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="password" className="text-right">
                                        Password
                                    </Label>
                                    <PasswordInput className="col-span-3" />
                                </div>
                                <div className="flex items-center justify-end">
                                    <Checkbox name="reset_avatar" id="reset_avatar" />
                                    <Label className="pl-2" htmlFor="reset_avatar">
                                        Reset Avatar
                                    </Label>
                                </div>
                            </>
                        )}
                    </div>
                    <DialogFooter className="gap-2">
                        {error && <div className="text-red-500 text-sm self-center">{error}</div>}
                        <Button asChild type="submit">
                            <SubmitButton content="Save" loading="Saving changes..." />
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditAccountButton;
