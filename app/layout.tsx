import Link from "next/link"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav style={{ display: "flex", gap: "15px", padding: "10px", background: "#f0f0f0", marginBottom: "20px" }}>
          <Link href="/blogs">Blogs</Link>
          <Link href="/blogs/new">Create New</Link>
          <Link href="/users">Users</Link>
        </nav>
        <main style={{ padding: "0 15px" }}>{children}</main>
      </body>
    </html>
  )
}
