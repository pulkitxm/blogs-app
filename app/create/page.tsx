"use client";

import React, { useState } from 'react'
import { addBlog } from '../actions/blogs';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function page() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = { title, content };

        if (title != "" && content != "") {
            const res = await addBlog(formData.title, formData.content);

            if (res.success) {
                router.push("/");
            } else {
                return;
            }
        }

        return;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-950 flex-col">
            <div className="flex w-full max-w-md">
                <Link href={"/"} className="my-2 cursor-pointer">
                    Back
                </Link>
            </div>
            <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-md flex flex-col gap-4">
                <label htmlFor="title" className="font-semibold text-gray-200">Title</label>
                <input
                    id="title"
                    className="border border-gray-700 bg-gray-800 text-gray-100 rounded px-3 py-2 outline-none focus:border-blue-500 mb-2 placeholder-gray-400"
                    value={title}
                    onChange={e => {
                        setTitle(e.target.value);
                    }}
                    placeholder="Enter title"
                />
                <label htmlFor="content" className="font-semibold text-gray-200">Content</label>
                <input
                    id="content"
                    className="border border-gray-700 bg-gray-800 text-gray-100 rounded px-3 py-2 outline-none focus:border-blue-500 mb-4 placeholder-gray-400"
                    value={content}
                    onChange={e => {
                        setContent(e.target.value);
                    }}
                    placeholder="Enter content"
                />
                <button
                    type='submit'
                    className="bg-blue-700 text-white font-semibold py-2 rounded hover:bg-blue-800 transition duration-200"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}
