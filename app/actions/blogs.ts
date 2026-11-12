"use server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { addBlog, likeBlog } from "../services/blogs"

export async function createBlog(formData: FormData) {
  const title = formData.get("title") as string
  const author = formData.get("author") as string
  const url = formData.get("url") as string
  if (title && author && url) {
    await addBlog(title, author, url)
    revalidatePath("/blogs")
    revalidatePath("/users")
    redirect("/blogs")
  }
}

export async function handleLikeBlog(formData: FormData) {
  const id = Number(formData.get("id"))
  if (id) {
    await likeBlog(id)
    revalidatePath(`/blogs/${id}`)
    revalidatePath("/blogs")
  }
}
