# NovaSaaS — Premium Next.js Admin Dashboard

NovaSaaS is a premium foundation for a modern SaaS admin dashboard.

## Current status

**Step 1 — Foundation**

This project currently contains the initial frontend foundation and a temporary welcome page. Dashboard features will be implemented in a later step.

## Technology stack

- Next.js with the App Router
- TypeScript in strict mode
- Tailwind CSS
- Geist application font
- ESLint and Prettier
- npm

## Requirements

- Node.js 20.9 or newer
- npm 10 or newer

## Installation

```bash
npm install
```

## Commands

Start the development server:

```bash
npm run dev
```

Run linting:

```bash
npm run lint
```

Check types:

```bash
npm run typecheck
```

Check formatting:

```bash
npm run format:check
```

Format the project:

```bash
npm run format
```

Create a production build:

```bash
npm run build
```

Open [http://localhost:3000](http://localhost:3000) after starting the development server.

## Folder structure

```text
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── ui/
├── config/
│   └── app.config.ts
├── lib/
│   └── utils.ts
└── types/
```

This is currently a frontend-only project. No real authentication, backend, database, or payment functionality has been implemented.
