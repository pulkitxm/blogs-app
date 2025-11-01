"use client";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { Button } from "./ui/button";
import { editBlog } from "@/app/actions/blogs";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export function EditBlog({ id, initialValues, onSuccess }: { id: string, initialValues: { title: string, content: string }, onSuccess?: () => void }) {
    const [title, settitle] = useState(initialValues.title);
    const [content, setcontent] = useState(initialValues.content);
    const [loading, setloading] = useState(false);
    const router = useRouter();

    async function handleSubmit() {
        setloading(true);

        try {
            await editBlog(id, title, content);
            if (onSuccess) {
                onSuccess();
            } else {
                router.refresh();
            }
        } finally {
            setloading(false);
        }
    }

    return (
        <Dialog>
            <form onSubmit={handleSubmit}>
                <DialogTrigger asChild>
                    <MdModeEditOutline className="text-white" />
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-black text-white border-gray-700">
                    <DialogHeader>
                        <DialogTitle>Edit Blog</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Title</Label>
                            <Input id="name-1" name="name" value={title} onChange={e => settitle(e.target.value)} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="username-1">Content</Label>
                            <Input id="username-1" name="username" value={content} onChange={e => setcontent(e.target.value)} />
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
