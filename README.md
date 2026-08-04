# TV Supreme Rebuild

This project rebuilds the TV Supreme website as a real content platform:

- `Next.js` App Router for the public site and admin overview
- `PostgreSQL` for programs, schedules, articles, videos, and social posts
- `Prisma` ORM for schema management and queries
- sync scaffolding for `YouTube` and `Facebook`

## Local setup

1. Copy `.env.example` to `.env`.
2. Create the database if it does not exist:

```bash
createdb supreme_tv
```

3. Install dependencies:

```bash
npm install
```

4. Generate the Prisma client, run migrations, and seed:

```bash
npm run db:generate
npm run db:migrate -- --name init
npm run db:seed
```

5. Start the app:

```bash
npm run dev
```

## Social sync

### YouTube

Set:

- `YOUTUBE_API_KEY`
- `YOUTUBE_CHANNEL_HANDLES`

Run:

```bash
npm run sync:youtube
```

### Facebook

Set:

- `FACEBOOK_PAGE_ACCESS_TOKEN`
- `FACEBOOK_PAGE_IDS`
- optionally `FACEBOOK_GRAPH_VERSION`

Run:

```bash
npm run sync:facebook
```

## API-triggered sync

Protected endpoints:

- `POST /api/sync/youtube`
- `POST /api/sync/facebook`

Pass:

```text
x-sync-secret: <SYNC_SECRET>
```

## Current foundation

Implemented now:

- database schema for the core media system
- seed data for programs, schedule, social accounts, and sample content
- public pages backed by Prisma queries
- admin overview page
- YouTube and Facebook sync scaffolding

Not implemented yet:

- authenticated CMS
- editorial CRUD forms
- media upload workflow
- automated job scheduler
