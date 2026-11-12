export type Blog = { id: number; title: string; author: string; url: string; likes: number }
let blogs: Blog[] = [
  { id: 1, title: "First Blog", author: "Author One", url: "https://example.com/1", likes: 5 },
  { id: 2, title: "Second Blog", author: "Author Two", url: "https://example.com/2", likes: 10 },
]
export const getBlogs = () => blogs
export const getBlogById = (id: number) => blogs.find((b) => b.id === id)
export const addBlog = (title: string, author: string, url: string) => {
  blogs.push({ id: blogs.length + 1, title, author, url, likes: 0 })
}
export const likeBlog = (id: number) => {
  const b = blogs.find((x) => x.id === id)
  if (b) b.likes += 1
}
