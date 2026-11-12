import Link from "next/link"
import "./globals.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-slate-100">
        <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-slate-800 shadow-lg">
          <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 rounded-full bg-indigo-500 animate-pulse"></span>
              <h1 className="font-bold text-lg tracking-wider bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                FullStack Blog
              </h1>
            </div>
            <nav className="flex items-center gap-2">
              <Link
                href="/blogs"
                className="px-4 py-2 rounded-xl text-sm font-medium transition-all hover:bg-slate-800 hover:text-indigo-400"
              >
                Blogs
              </Link>
              <Link
                href="/blogs/new"
                className="px-4 py-2 rounded-xl text-sm font-medium transition-all hover:bg-slate-800 hover:text-indigo-400"
              >
                Create New
              </Link>
              <Link
                href="/users"
                className="px-4 py-2 rounded-xl text-sm font-medium transition-all hover:bg-slate-800 hover:text-indigo-400"
              >
                Users
              </Link>
            </nav>
          </div>
        </header>
        <main className="max-w-5xl mx-auto px-6 py-10">{children}</main>
      </body>
    </html>
  )
}
