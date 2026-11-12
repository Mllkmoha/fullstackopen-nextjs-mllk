import { createBlog } from "../../actions/blogs"

export default function CreateBlogPage() {
  return (
    <div className="max-w-xl mx-auto bg-slate-900/80 border border-slate-800 rounded-3xl p-8 shadow-2xl backdrop-blur-xl mt-6">
      <div className="mb-6">
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          New Entry
        </span>
        <h2 className="text-3xl font-extrabold text-slate-100 mt-2 tracking-tight">
          Create New Blog
        </h2>
        <p className="text-slate-400 text-sm mt-1">Share an insightful article with the community.</p>
      </div>

      <form action={createBlog} className="space-y-5">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-2">Title</label>
          <input
            type="text"
            name="title"
            required
            placeholder="e.g., Full Stack Web Development"
            className="w-full bg-slate-950/60 border border-slate-800 text-slate-100 placeholder-slate-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-2">Author</label>
          <input
            type="text"
            name="author"
            required
            placeholder="e.g., Mohamed Rafik"
            className="w-full bg-slate-950/60 border border-slate-800 text-slate-100 placeholder-slate-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-2">URL</label>
          <input
            type="url"
            name="url"
            required
            placeholder="https://example.com"
            className="w-full bg-slate-950/60 border border-slate-800 text-slate-100 placeholder-slate-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-600/20 cursor-pointer active:scale-95 mt-4"
        >
          Create Blog
        </button>
      </form>
    </div>
  )
}
