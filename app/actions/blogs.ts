"use server";

import { prisma } from "@/lib/primsa";

export async function addBlog(title:string, content:string) {
    try {
        const newBlog = await prisma.blog.create({
            data: {
                content,
                title
            }
        });
    
        return {
            success: true,
            newBlog
        };
    } catch(e) {
        return {
            success: false,
            error: "Failed to add blog"
        }
    }
}