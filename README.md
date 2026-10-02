# NovaSaaS Free

An open-source SaaS admin dashboard starter built with Next.js, TypeScript,
and Tailwind CSS. NovaSaaS provides a polished frontend foundation that you can
connect to your own API, database, authentication provider, and business logic.

[View the live demo](https://novasaas-v1.netlify.app/) ·
[Open the dashboard](https://novasaas-v1.netlify.app/login)

## Highlights

- Responsive application shell with desktop and mobile navigation
- Collapsible sidebar with persisted browser preference
- Dashboard with metrics, revenue visualization, plan distribution, and activity
- Light, dark, and system themes
- Keyboard command menu with `Cmd/Ctrl + K`
- Notification preview, organization switcher, and user menu
- Demo authentication, registration, recovery, and email-verification flows
- Typed roles, permissions, permission-aware navigation, and client-side guards
- Reusable accessible components built with Radix UI primitives
- Design system showcase at `/design-system`
- Automated tests with Vitest and React Testing Library
- Netlify configuration included

## Demo accounts

| Role        | Email              | Password   |
| ----------- | ------------------ | ---------- |
| Super Admin | `admin@demo.com`   | `password` |
| Manager     | `manager@demo.com` | `password` |
| Member      | `member@demo.com`  | `password` |

These credentials are public frontend fixtures. They do not authenticate
against a server and must never be reused in production.

## Technology

- Next.js 16 with the App Router
- React 19
- TypeScript in strict mode
- Tailwind CSS 4
- Radix UI primitives
- Lucide React
- React Hook Form and Zod
- next-themes
- Vitest and React Testing Library
- ESLint and Prettier

## Getting started

Requirements:

- Node.js 20.9 or newer
- npm 10 or newer

```bash
git clone https://github.com/dvanessa/novasaas.git
cd novasaas
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available scripts

```bash
npm run dev          # Start the development server
npm run build        # Create a production build
npm run start        # Run the production server
npm run lint         # Run ESLint
npm run typecheck    # Check TypeScript
npm run test         # Run the test suite
npm run test:watch   # Run tests in watch mode
npm run format       # Format the codebase
npm run format:check # Check formatting
```

## Project structure

```text
src/
├── app/                 # App Router pages and layouts
├── components/
│   ├── auth/            # Authentication and permission guards
│   ├── dashboard/       # Application shell and dashboard modules
│   ├── theme/           # Theme provider and selector
│   └── ui/              # Reusable UI primitives
├── config/              # App, auth, navigation, and permissions config
├── features/auth/       # Forms, schemas, services, and auth tests
├── hooks/               # Authentication and permission hooks
├── lib/                 # Navigation, permissions, and shared utilities
├── stores/              # Demo session store
└── types/               # Shared TypeScript types
```

## Routes

The working demo includes:

- `/` — product landing page
- `/login`, `/register`, `/forgot-password`, `/reset-password`, `/verify-email`
- `/dashboard` — completed Free dashboard overview
- `/design-system` — tokens and component showcase
- `/forbidden` — access-denied state

The sidebar also includes integration-ready starter pages for analytics,
organizations, users, roles, subscriptions, billing, invoices, notifications,
audit logs, and settings. These pages intentionally provide navigation,
permissions, and layout foundations without pretending to implement backend
business operations.

## Authentication and security

NovaSaaS Free is a frontend starter, not a production authentication system.

- Sessions are simulated and stored in browser local storage.
- Route guards and hidden controls are presentation behavior, not security
  boundaries.
- There is no backend, database, OAuth, JWT, password hashing, real payment
  processing, or email delivery.
- Production authorization must be enforced by your backend for every protected
  endpoint and data operation.

The async interface in `src/features/auth/services/auth.service.ts` is the
replacement point for a real backend implementation.

## Customization

1. Update product metadata in `src/config/app.config.ts`.
2. Adjust semantic color tokens in `src/app/globals.css`.
3. Configure navigation in `src/config/navigation.ts`.
4. Configure roles and permissions in `src/config/permissions.config.ts`.
5. Replace the demo auth service with your server integration.
6. Replace dashboard fixture data with API responses.

## Deploying to Netlify

Import `dvanessa/novasaas` in Netlify and use:

```text
Base directory: (empty)
Build command: npm run build
Publish directory: .next
Production branch: main
```

The root `netlify.toml` contains the build and publish configuration. Netlify
automatically provides its Next.js adapter; this project does not use static
export.

## Free and Pro editions

NovaSaaS Free contains the reusable shell, dashboard overview, design system,
demo authentication, and permission foundations. A separate future Pro edition
may add advanced data tables, CRUD workflows, organizations, configurable
roles, billing screens, richer analytics, API adapters, and additional layouts.

## License

NovaSaaS Free is available under the [MIT License](LICENSE).

## Author

Created by Vanessa Duarte.
