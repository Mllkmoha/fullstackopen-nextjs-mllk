import { Suspense } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getUserWithBlogs } from "../../services/users"

async function UserDetailContent({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params
  const user = await getUserWithBlogs(username)

  if (!user) notFound()

  return (
    <section className="mx-auto max-w-3xl space-y-6">
      <header className="border-b border-slate-800 pb-6">
        <p className="text-sm text-indigo-400">@{user.username}</p>
        <h2 className="mt-2 text-3xl font-bold text-slate-100">{user.name}</h2>
      </header>

      <div>
        <h3 className="mb-4 text-lg font-semibold text-slate-200">Blogs</h3>
        {user.blogs.length === 0 ? (
          <p className="text-sm text-slate-400">No blogs yet.</p>
        ) : (
          <ul className="divide-y divide-slate-800">
            {user.blogs.map((blog) => (
              <li key={blog.id} className="py-4">
                <Link
                  href={`/blogs/${blog.id}`}
                  className="font-medium text-indigo-400 hover:text-indigo-300"
                >
                  {blog.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

export default function UserPage({ params }: { params: Promise<{ username: string }> }) {
  return (
    <Suspense fallback={<p className="text-sm text-slate-400">Loading user...</p>}>
      <UserDetailContent params={params} />
    </Suspense>
  )
}