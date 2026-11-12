import { createBlog } from "../../../actions/blogs"
export default function NewBlog() {
  return (
    <div>
      <h2>Create a new blog</h2>
      <form action={createBlog}>
        <input type="text" name="title" placeholder="Title" required /><br/>
        <input type="text" name="author" placeholder="Author" required /><br/>
        <input type="text" name="url" placeholder="URL" required /><br/>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}
