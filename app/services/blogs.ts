import { eq } from "drizzle-orm"
import { db } from "../../db"
import { blogs, users } from "../../db/schema"

export const getBlogs = async () => {
  return db.query.blogs.findMany({
    with: { user: true },
  })
}

export const getBlogById = async (id: number) => {
  return db.query.blogs.findFirst({
    where: eq(blogs.id, id),
    with: { user: true },
  })
}

export const addBlog = async (title: string, author: string, url: string) => {
  let defaultUser = await db.query.users.findFirst()
  if (!defaultUser) {
    const [created] = await db
      .insert(users)
      .values({ username: "mllkmoha", name: "Mohamed Rafik" })
      .returning()
    defaultUser = created
  }
  await db.insert(blogs).values({
    title,
    author,
    url,
    likes: 0,
    userId: defaultUser.id,
  })
}

export const likeBlog = async (id: number) => {
  const blog = await getBlogById(id)
  if (blog) {
    await db
      .update(blogs)
      .set({ likes: blog.likes + 1 })
      .where(eq(blogs.id, id))
  }
}
