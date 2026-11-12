import { Suspense } from "react"
import { notFound } from "next/navigation"
import { getBlogById } from "../../services/blogs"
import { handleLikeBlog } from "../../actions/blogs"

async function BlogContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const blog = getBlogById(Number(id))
  if (!blog) notFound()
  return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.url}</p>
      <p>{blog.likes} likes</p>
      <form action={handleLikeBlog}>
        <input type="hidden" name="id" value={blog.id} />
        <button type="submit">like</button>
      </form>
      <p>added by {blog.author}</p>
    </div>
  )
}

export default function BlogDetail({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <BlogContent params={params} />
    </Suspense>
  )
}
