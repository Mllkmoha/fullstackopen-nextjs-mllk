import { Suspense } from "react"
import Link from "next/link"
import { getUsers } from "../services/users"

async function UsersList() {
  const users = await getUsers()
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/70 shadow-xl">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-800 text-slate-400 text-sm bg-slate-950/40">
            <th className="py-4 px-6 font-semibold">User</th>
            <th className="py-4 px-6 font-semibold text-right">Blogs Created</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60">
          {users.map(u => (
            <tr key={u.id} className="hover:bg-slate-800/40 transition-colors">
              <td className="py-4 px-6">
                <Link href={`/users/${u.id}`} className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
                  {u.name}
                </Link>
              </td>
              <td className="py-4 px-6 text-right text-slate-300 font-semibold">
                <span className="px-3 py-1 rounded-full bg-slate-800 text-xs">
                  {u.blogs.length}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-100">Users</h2>
        <p className="text-slate-400 text-sm mt-1">Overview of registered authors and their contributions.</p>
      </div>
      <Suspense fallback={<div className="h-40 bg-slate-900/40 rounded-2xl animate-pulse"></div>}>
        <UsersList />
      </Suspense>
    </div>
  )
}
