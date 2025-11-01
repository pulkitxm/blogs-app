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

export async function editBlog(id: string, title: string, content: string) {
    try {
        const newBlog = await prisma.blog.update({
            where:{
                id
            },
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
            error: "Failed to edit blog"
        }
    }
}

export async function deleteBlog(id: string) {
    try {
        const newBlog = await prisma.blog.delete({
            where:{
                id
            },
        });
    
        return {
            success: true,
            newBlog
        };
    } catch(e) {
        return {
            success: false,
            error: "Failed to edit blog"
        }
    }
}