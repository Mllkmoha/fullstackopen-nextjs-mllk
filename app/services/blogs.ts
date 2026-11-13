import { eq, sql } from "drizzle-orm";
import { db } from "../../db";
import { blogs, users } from "../../db/schema";

export const getBlogs = async () => {
  return db.query.blogs.findMany({
    with: { user: true },
  });
};

export const getBlogById = async (id: number) => {
  return db.query.blogs.findFirst({
    where: eq(blogs.id, id),
    with: { user: true },
  });
};

export const addBlog = async (input: {
  title: string;
  url: string;
  userId: number;
}) => {
  const user = await db.query.users.findFirst({
    where: eq(users.id, input.userId),
  });

  if (!user) {
    throw new Error("The selected author does not exist");
  }

  await db.insert(blogs).values({
    title: input.title,
    author: user.name,
    url: input.url,
    likes: 0,
    userId: user.id,
  });

  return user.username;
};

export const likeBlog = async (id: number) => {
  if (!Number.isSafeInteger(id) || id < 1) {
    return;
  }

  await db
    .update(blogs)
    .set({ likes: sql`${blogs.likes} + 1` })
    .where(eq(blogs.id, id));
};
