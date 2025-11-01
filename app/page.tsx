"use client";

import { DeleteBlog } from "@/components/delete-blog";
import { EditBlog } from "@/components/edit-blog";
import { getBlogs } from "@/app/actions/blogs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { RefreshCw } from "lucide-react";

type Blog = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
};

export default function Home() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const result = await getBlogs();
      if (result.success) {
        setBlogs(result.blogs);
      }
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center py-10">
      <div className="w-full max-w-2xl flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-100">All Blogs</h1>
        <button
          onClick={fetchBlogs}
          disabled={loading}
          className="p-2 rounded-full hover:bg-gray-800 transition-colors disabled:opacity-50"
          title="Reload blogs"
        >
          <RefreshCw
            className={`w-5 h-5 text-gray-100 ${loading ? "animate-spin" : ""}`}
          />
        </button>
      </div>
      <div className="flex justify-end w-full max-w-2xl">
        <Link href={"/create"} className="my-2 cursor-pointer text-white hover:text-blue-400 transition-colors">
          Create Blogs
        </Link>
      </div>
      <div className="w-full max-w-2xl flex flex-col gap-6">
        {loading ? (
          // Skeleton loader
          <>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-gray-900 rounded-lg p-6 shadow-md border border-gray-800"
              >
                <div className="flex justify-between items-center mb-4">
                  <Skeleton className="h-7 w-3/4" />
                  <div className="flex gap-2">
                    <Skeleton className="h-5 w-5" />
                    <Skeleton className="h-5 w-5" />
                  </div>
                </div>
                <Skeleton className="h-20 w-full mb-3" />
                <div className="flex justify-end">
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            ))}
          </>
        ) : blogs.length === 0 ? (
          <div className="text-center text-gray-400 py-10">
            No blogs found. Create your first blog!
          </div>
        ) : (
          blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-gray-900 rounded-lg p-6 shadow-md border border-gray-800 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex justify-between items-center cursor-pointer">
                <h2 className="text-xl font-semibold text-blue-400 mb-2">
                  {blog.title}
                </h2>
                <div className="flex gap-2">
                  <EditBlog
                    id={blog.id}
                    initialValues={{
                      title: blog.title,
                      content: blog.content,
                    }}
                    onSuccess={fetchBlogs}
                  />
                  <DeleteBlog id={blog.id} onSuccess={fetchBlogs} />
                </div>
              </div>

              <p className="text-gray-300">{blog.content}</p>
              <div className="flex justify-end mt-3">
                <span className="text-xs text-gray-500">
                  {new Date(blog.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
