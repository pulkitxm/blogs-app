"use client";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react";
import { Button } from "./ui/button";
import { deleteBlog } from "@/app/actions/blogs";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { MdOutlineDeleteOutline } from "react-icons/md";

export function DeleteBlog({ id }: { id: string }) {
    const [loading, setloading] = useState(false);
    const router = useRouter();

    async function handleSubmit() {
        setloading(true);

        try {
            await deleteBlog(id);
            router.refresh();
        } finally {
            setloading(false);
        }
    }

    return (
        <Dialog>
            <form onSubmit={handleSubmit}>
                <DialogTrigger asChild>
                    <MdOutlineDeleteOutline className="text-red-500" />
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-black text-white border-gray-700">
                    <DialogHeader>
                        <DialogTitle>Delete Blog</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            Are you sure you want to delete this blog?
                        </div>
                    </div>
                    <DialogClose asChild>
                        <Button type="submit" onClick={handleSubmit}>
                            {
                                loading ? <Loader2 className="animate-spin" /> : "Submit"
                            }
                        </Button></DialogClose>
                </DialogContent>
            </form>
        </Dialog>
    )
}
