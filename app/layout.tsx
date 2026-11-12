import Link from "next/link"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <nav style={{ padding: "1rem", background: "#f0f0f0", marginBottom: "1rem" }}>
          <Link href="/">home</Link>
          {" | "}
          <Link href="/blogs">blogs</Link>
          {" | "}
          <Link href="/blogs/new">create new</Link>
        </nav>
        {children}
      </body>
    </html>
  )
}
