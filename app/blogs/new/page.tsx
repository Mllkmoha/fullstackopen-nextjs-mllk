import { createBlog } from "../../actions/blogs";
import { getBlogAuthors } from "../../services/users";
import { Suspense } from "react";

async function CreateBlogContent({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const [users, { error }] = await Promise.all([
    getBlogAuthors(),
    searchParams,
  ]);

  return (
    <div className="max-w-xl mx-auto bg-slate-900/80 border border-slate-800 rounded-3xl p-8 shadow-2xl backdrop-blur-xl mt-6">
      <div className="mb-6">
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          New Entry
        </span>
        <h2 className="text-3xl font-extrabold text-slate-100 mt-2 tracking-tight">
          Create New Blog
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Share an insightful article with the community.
        </p>
      </div>

      {error && (
        <p
          role="alert"
          className="mb-5 rounded-lg border border-rose-900 bg-rose-950/50 p-3 text-sm text-rose-200"
        >
          {error === "invalid"
            ? "Enter a valid title, author, and HTTP or HTTPS URL."
            : "The blog could not be saved. Check that the selected author still exists and try again."}
        </p>
      )}

      {users.length === 0 ? (
        <p
          role="status"
          className="rounded-lg border border-slate-700 bg-slate-950/60 p-4 text-sm text-slate-300"
        >
          Add an author to the users table before creating a blog.
        </p>
      ) : (
        <form action={createBlog} className="space-y-5">
          <div>
            <label
              htmlFor="title"
              className="block text-xs font-medium text-slate-300 mb-2"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              name="title"
              required
              maxLength={200}
              placeholder="e.g., Full Stack Web Development"
              className="w-full bg-slate-950/60 border border-slate-800 text-slate-100 placeholder-slate-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner"
            />
          </div>

          <div>
            <label
              htmlFor="userId"
              className="block text-xs font-medium text-slate-300 mb-2"
            >
              Author
            </label>
            <select
              id="userId"
              name="userId"
              required
              defaultValue=""
              className="w-full bg-slate-950/60 border border-slate-800 text-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner"
            >
              <option value="" disabled>
                Select an author
              </option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} (@{user.username})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="url"
              className="block text-xs font-medium text-slate-300 mb-2"
            >
              URL
            </label>
            <input
              id="url"
              type="url"
              name="url"
              required
              maxLength={2048}
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
      )}
    </div>
  );
}

export default function CreateBlogPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  return (
    <Suspense
      fallback={<p className="text-sm text-slate-400">Loading authors...</p>}
    >
      <CreateBlogContent searchParams={searchParams} />
    </Suspense>
  );
}
