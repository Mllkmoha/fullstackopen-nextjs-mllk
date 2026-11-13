import { asc, eq } from "drizzle-orm";
import { db } from "../../db";
import { users } from "../../db/schema";

export const getUsers = async () => {
  return db.query.users.findMany({
    with: { blogs: true },
    orderBy: [asc(users.name)],
  });
};

export const getBlogAuthors = async () => {
  return db
    .select({ id: users.id, username: users.username, name: users.name })
    .from(users)
    .orderBy(asc(users.name));
};

export const getUserWithBlogs = async (username: string) => {
  return db.query.users.findFirst({
    where: eq(users.username, username),
    with: { blogs: true },
  });
};
