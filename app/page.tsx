import { prisma } from "@/lib/primsa";
import Link from "next/link";

export default async function Home() {

  const blogs = await prisma.blog.findMany();

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold text-gray-100 mb-8">All Blogs</h1>
      <div className="flex justify-end w-full max-w-2xl">
        <Link href={"/create"} className="my-2 cursor-pointer">
          Create Blogs
        </Link>
      </div>
      <div className="w-full max-w-2xl flex flex-col gap-6">
        {blogs.map((blog, index) => (
          <div
            key={index}
            className="bg-gray-900 rounded-lg p-6 shadow-md border border-gray-800 hover:shadow-lg transition-shadow duration-200"
          >
            <h2 className="text-xl font-semibold text-blue-400 mb-2">{blog.title}</h2>
            <p className="text-gray-300">{blog.content}</p>
            <div className="flex justify-end mt-3">
              <span className="text-xs text-gray-500">{new Date(blog.createdAt).toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
