"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addBlog, likeBlog } from "../services/blogs";

export async function createBlog(formData: FormData) {
  const titleValue = formData.get("title");
  const urlValue = formData.get("url");
  const userIdValue = formData.get("userId");

  if (
    typeof titleValue !== "string" ||
    typeof urlValue !== "string" ||
    typeof userIdValue !== "string"
  ) {
    redirect("/blogs/new?error=invalid");
  }

  const title = titleValue.trim();
  const url = urlValue.trim();
  const userId = Number(userIdValue);
  let parsedUrl: URL;

  try {
    parsedUrl = new URL(url);
  } catch {
    redirect("/blogs/new?error=invalid");
  }

  if (
    title.length === 0 ||
    title.length > 200 ||
    url.length > 2048 ||
    !["http:", "https:"].includes(parsedUrl.protocol) ||
    !Number.isSafeInteger(userId) ||
    userId < 1
  ) {
    redirect("/blogs/new?error=invalid");
  }

  let username: string;
  try {
    username = await addBlog({ title, url, userId });
  } catch {
    console.error("Unable to create blog");
    redirect("/blogs/new?error=save");
  }

  revalidatePath("/blogs");
  revalidatePath("/users");
  revalidatePath(`/users/${encodeURIComponent(username)}`);
  redirect("/blogs");
}

export async function handleLikeBlog(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!Number.isSafeInteger(id) || id < 1) {
    return;
  }

  await likeBlog(id);
  revalidatePath(`/blogs/${id}`);
  revalidatePath("/blogs");
}
