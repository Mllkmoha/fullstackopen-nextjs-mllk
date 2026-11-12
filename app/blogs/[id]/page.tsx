import { Suspense } from "react"
import { notFound } from "next/navigation"
import { getBlogById } from "../../services/blogs"
import { handleLikeBlog } from "../../actions/blogs"
import Link from "next/link"

async function BlogContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const blog = await getBlogById(Number(id))
  if (!blog) notFound()

  return (
    <div className="max-w-2xl mx-auto bg-slate-900/80 border border-slate-800 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
      <div className="flex items-center justify-between mb-6">
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          Blog Details
        </span>
        <span className="text-sm text-slate-400">
          Added by <span className="text-slate-200 font-medium">{blog.user ? blog.user.name : blog.author}</span>
        </span>
      </div>

      <h2 className="text-3xl font-extrabold text-slate-100 mb-4 tracking-tight">
        {blog.title}
      </h2>

      <div className="mb-6 p-4 rounded-2xl bg-slate-950/50 border border-slate-800/80 flex items-center justify-between overflow-x-auto">
        <a
          href={blog.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-400 hover:text-indigo-300 text-sm font-medium underline truncate max-w-md transition-colors"
        >
          {blog.url}
        </a>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-slate-800/80">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-slate-100">{blog.likes}</span>
          <span className="text-sm text-slate-400">Likes</span>
        </div>

        <form action={handleLikeBlog}>
          <input type="hidden" name="id" value={blog.id} />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-600/20 cursor-pointer active:scale-95 flex items-center gap-2"
          >
            ❤️ Like
          </button>
        </form>
      </div>

      <div className="mt-8 pt-4">
        <Link
          href="/blogs"
          className="text-sm text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-1"
        >
          ← Back to all blogs
        </Link>
      </div>
    </div>
  )
}

export default function BlogDetail({ params }: { params: Promise<{ id: string }> }) {
  return (
    <div className="py-6">
      <Suspense fallback={
        <div className="max-w-2xl mx-auto bg-slate-900/40 border border-slate-800/60 rounded-3xl p-8 h-64 animate-pulse"></div>
      }>
        <BlogContent params={params} />
      </Suspense>
    </div>
  )
}
