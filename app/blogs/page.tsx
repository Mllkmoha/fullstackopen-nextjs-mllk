import { Suspense } from "react"
import Link from "next/link"
import { getBlogs } from "../services/blogs"

async function BlogList({ searchParams }: { searchParams: Promise<{ search?: string }> }) {
  const { search } = await searchParams
  const list = [...getBlogs()].sort((a, b) => b.likes - a.likes)
  const filtered = search ? list.filter(b => b.title.toLowerCase().includes(search.toLowerCase())) : list

  return (
    <ul>
      {filtered.map(b => (
        <li key={b.id}>
          <Link href={`/blogs/${b.id}`}>{b.title}</Link> by {b.author} ({b.likes} likes)
        </li>
      ))}
    </ul>
  )
}

export default function Blogs({ searchParams }: { searchParams: Promise<{ search?: string }> }) {
  return (
    <div>
      <h2>Blogs</h2>
      <form method="GET">
        <input type="text" name="search" placeholder="Search..." />
        <button type="submit">Search</button>
      </form>
      <Suspense fallback={<p>Loading blogs...</p>}>
        <BlogList searchParams={searchParams} />
      </Suspense>
    </div>
  )
}
