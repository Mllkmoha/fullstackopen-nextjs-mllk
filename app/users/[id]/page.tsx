import { Suspense } from "react"
import { notFound } from "next/navigation"
import { getUserById } from "../../services/users"

async function UserDetailContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const user = await getUserById(Number(id))
  if (!user) notFound()

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(b => (
          <li key={b.id}>{b.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default function UserPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<p>Loading user...</p>}>
      <UserDetailContent params={params} />
    </Suspense>
  )
}
