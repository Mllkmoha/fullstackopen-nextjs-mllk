import { Suspense } from "react"
import Link from "next/link"
import { getUsers } from "../services/users"

async function UsersList() {
  const users = await getUsers()
  return (
    <table>
      <thead>
        <tr>
          <th>User</th>
          <th>Blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users.map(u => (
          <tr key={u.id}>
            <td><Link href={`/users/${u.id}`}>{u.name}</Link></td>
            <td>{u.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default function UsersPage() {
  return (
    <div>
      <h2>Users</h2>
      <Suspense fallback={<p>Loading users...</p>}>
        <UsersList />
      </Suspense>
    </div>
  )
}
