"use server"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { addBlog, likeBlog } from "../services/blogs"

export const createBlog = async (formData: FormData) => {
  addBlog(formData.get("title") as string, formData.get("author") as string, formData.get("url") as string)
  revalidatePath("/blogs")
  redirect("/blogs")
}
export const handleLikeBlog = async (formData: FormData) => {
  const id = Number(formData.get("id"))
  likeBlog(id)
  revalidatePath(`/blogs/${id}`)
  revalidatePath("/blogs")
}
