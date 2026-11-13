This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Full Stack Blog database workflow

This app uses Neon PostgreSQL through Drizzle ORM. Create `.env.local` in the
project root with `DATABASE_URL` from Neon. `.env.local` is ignored by Git; do
not commit the connection string.

```bash
npm install
npm run db:migrate
npm run dev
```

After changing `db/schema.ts`, run `npm run db:generate`, inspect the SQL under
`drizzle/`, and then run `npm run db:migrate`. Open Drizzle Studio with
`npm run db:studio`.

To create a user in Studio, add a row in `users` with a unique `username` and a
`name`, leaving the serial `id` blank. To associate an existing blog with a
different user, set its `userId` to that user's `id`. Blog ownership is required
and enforced by a foreign key. New blogs select an existing user in the form.
The `/users` list links to `/users/[username]`, whose data is loaded with one
Drizzle relational query.

Before applying the ownership migration to another database, ensure all existing
blogs have a valid `userId`. The migration does not drop tables or rewrite blog
content.

## Vercel and course submission

Push the repository to GitHub, import it into Vercel, configure `DATABASE_URL`
for the deployment environments, and apply migrations to the connected Neon
database. After verifying the public deployment, sign in to the [Full Stack Open
Next.js course](https://courses.mooc.fi/org/uh-cs/courses/full-stack-open-nextjs),
open Chapter 3, and complete the submission prompts for exercises 7 through 10.
For exercise 7, submit the verified public URL where the platform requests it.
Only the course platform can record exercise completion or certificate
progress.
