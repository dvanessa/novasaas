# NovaSaaS — Premium Next.js Admin Dashboard

NovaSaaS is a premium foundation for a modern SaaS admin dashboard.

GitHub repository: `dvanessa/novasaas`.

## Current status

**Step 4 — Demo Authentication and Permissions**

This project includes the Step 1 foundation, Step 2 design system, Step 3 dashboard shell, and a browser-only demo authentication experience with typed roles, permissions, protected routes, and access-denied handling. It is not production-auth-ready.

## Technology stack

- Next.js with the App Router
- TypeScript in strict mode
- Tailwind CSS
- Geist application font
- Radix UI primitives
- Class Variance Authority
- Lucide React icons
- next-themes
- React Hook Form, Zod, and `@hookform/resolvers`
- Vitest and React Testing Library
- ESLint and Prettier
- npm

## Requirements

- Node.js 20.9 or newer
- npm 10 or newer

## Installation

```bash
git clone https://github.com/dvanessa/novasaas.git
cd novasaas
npm ci
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

Run the automated tests:

```bash
npm run test
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

## Theme system

The application uses `next-themes` with a `ThemeProvider` wrapper in `src/components/theme/theme-provider.tsx` and a `ThemeToggle` selector in `src/components/theme/theme-toggle.tsx`.

Behavior:

- Default theme is `system`
- Light, dark, and system modes are supported
- The theme selector renders a stable system icon until client theme state is available; the root `html` element suppresses the intentional theme-attribute difference
- The UI relies on semantic CSS variables defined in `src/app/globals.css`

## Design tokens

The global design language is defined in `src/app/globals.css` and includes semantic tokens for:

- background / foreground
- surface / surface-foreground
- muted / muted-foreground
- primary / primary-foreground
- secondary / secondary-foreground
- accent / accent-foreground
- destructive / destructive-foreground
- success / success-foreground
- warning / warning-foreground
- info / info-foreground
- border / input / ring
- card / card-foreground
- popover / popover-foreground
- sidebar and chart variables reserved for future steps

The light and dark theme values are encoded as CSS custom properties and exposed to Tailwind through `@theme inline` so components can use semantic class names without repeating hard-coded colors.

## UI component library

Available components in `src/components/ui/`:

- alert
- avatar
- badge
- button
- card
- checkbox
- dialog
- dropdown-menu
- input
- label
- select
- separator
- skeleton
- switch
- tabs
- textarea
- tooltip

## Routes

Authentication demonstrations are available at `/login`, `/register`, `/forgot-password`, `/reset-password`, and `/verify-email`. Demo sessions are stored in browser local storage only. The dashboard route group is protected by client-side presentation guards; insufficient permissions route to `/forbidden`. The demo account switcher in the user menu lets you explicitly switch between roles.

### Public demo credentials

| Name           | Email              | Role        |
| -------------- | ------------------ | ----------- |
| Vanessa Duarte | `admin@demo.com`   | Super Admin |
| Alex Morgan    | `manager@demo.com` | Manager     |
| Jordan Lee     | `member@demo.com`  | Member      |

All three use the shared demo-only password `password`. These public fixture credentials exist in frontend code exclusively for the demonstration.

### Role and permission model

Stable role identifiers and the centralized permission map are defined in
`src/types/auth.ts`, `src/types/permissions.ts`, and
`src/config/permissions.config.ts`.

- **Super Admin:** all declared permissions.
- **Manager:** dashboard and analytics; organization viewing/management; user
  viewing, inviting, and editing; subscription viewing; notification viewing
  and management; audit-log viewing; profile and organization settings view /
  edit; appearance settings view / edit.
- **Member:** dashboard and notifications; own profile view / edit; appearance
  settings view / edit.

Navigation, command search, and settings links are derived from the same
permission-filtered navigation source. Direct route access is separately
checked against the most-specific matching entry in
`src/config/route-permissions.config.ts`. `PermissionGuard` and action examples
only control the demo UI; they are not security boundaries.

### Login and session flow

Login validates email and password, simulates an asynchronous service request,
and redirects to `/dashboard` or a sanitized internal `returnTo` destination.
Quick-login cards require an explicit click. Registration is temporary demo
behavior and navigates to the verification demonstration; it does not create a
permanent account. Password recovery always returns the same generic response.

The dedicated store at `src/stores/auth.store.ts` owns session hydration. It
persists only the versioned `novasaas-demo-session` record (`version`,
`accountId`, and `createdAt`); invalid or outdated values are discarded.
Passwords, credentials, tokens, and user records are not persisted. A loading
state is rendered before hydration and authorization to avoid a protected
content flash. Authentication operations are abstracted asynchronously in
`src/features/auth/services/auth.service.ts`; registration, password recovery,
and password reset remain simulated frontend demonstrations and do not call a
backend or send email. The demo accounts are centralized in
`src/config/auth.config.ts`, and their fixture password is never persisted.

Auth forms use React Hook Form with Zod schemas and accessible field-level
messages. Authentication types are centralized in `src/types/auth.ts` and
`src/types/permissions.ts`; stable role identifiers are `super_admin`,
`manager`, and `member`. The Vitest suite covers schemas, session persistence,
permission policy, route access, and auth UI behavior. Run `npm run test`; use
`npm run test:watch` while developing.

The dashboard placeholder routes include `/analytics`, `/organizations`, `/users`, `/roles`, `/subscriptions`, `/billing`, `/billing/invoices`, `/notifications`, `/audit-log`, and `/settings` with `/settings/appearance`, `/settings/billing`, `/settings/organization`, `/settings/profile`, and `/settings/security`. Use **Cmd/Ctrl+K** to open the command menu. The root page remains a minimal entry page with a dashboard link.

A development showcase is available at:

```text
/design-system
```

The route demonstrates the component library, tokens, spacing, form states, overlays, theme selector, and responsive layout patterns without building dashboard feature screens.

## Basic component usage

```tsx
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Example() {
  return (
    <div className="flex items-center gap-2">
      <Badge variant="success">Healthy</Badge>
      <Button variant="secondary" size="sm">
        Review action
      </Button>
    </div>
  );
}
```

## Adding a variant

To add a new component variant:

1. Update the `cva` variants for the component.
2. Keep the variant names semantic and reusable.
3. Add a small set of corresponding examples to `/design-system`.
4. Ensure the variant works in both light and dark modes.
5. Validate the component with ESLint, TypeScript, Prettier, and a production build.

## Accessibility conventions

- Prefer semantic HTML and labels for all form controls.
- Maintain visible focus rings and keyboard support for interactive elements.
- Provide accessible names for icon-only controls and menus.
- Use text and semantic context, not color alone, to communicate status.
- Keep touch targets comfortably sized and avoid inaccessible overlays.
- Use Radix UI primitives when implementing keyboard-managed interactions.

## Frontend-only project status

This project remains frontend-only. Authentication and route guards are
simulated in the browser. There is no backend, database, API route, OAuth, JWT,
password hashing/encryption, real token, or payment processing.

### Security limitations and ASP.NET Core replacement

- Client-side route guards do **not** secure data or replace server-side
  authorization.
- Hiding UI and using `PermissionGuard` do **not** replace authorization checks
  at the data/API boundary.
- Public demo passwords are fixture values. Production passwords and secrets
  must never be shipped in frontend code or exposed through `NEXT_PUBLIC_*`.
- Production sessions should use a suitable secure server-side design; do not
  copy this localStorage demo session into production.
- When integrating ASP.NET Core, replace the operations in
  `src/features/auth/services/auth.service.ts` with calls to the backend, let
  the backend establish and validate the real session, and enforce every
  permission on every protected endpoint and data operation. Keep the UI
  permission map only as a presentation aid.
- Do not add fake JWTs, fake cryptography, or client-only claims of security.

## Folder structure

```text
src/
├── app/
│   ├── design-system/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── theme/
│   └── ui/
├── config/
│   └── app.config.ts
├── lib/
│   └── utils.ts
└── types/
```

## Deployment to Netlify

Netlify Free is the selected preview host for this frontend-only demo. Netlify
automatically detects Next.js and uses its OpenNext adapter, which supports the
App Router and Server Components; this project does not use static export or a
legacy Next.js plugin.

The repository's `netlify.toml` sets the build command and publish directory.
In the Netlify project settings, use:

```text
Base directory: (leave empty)
Build command: npm run build
Publish directory: .next
Production branch: main
```

If an existing Netlify project was configured with `Documents/Projects/novasaas`
as its Base directory, remove that value after this pull request is merged.

The project requires Node.js 20.9 or newer and npm 10 or newer, as documented
above. No additional Node.js pin is configured; Next.js 16.3.6 supports
Node.js 20.9 and newer, and Netlify manages the build image.

### Importing the GitHub repository

1. Sign in to [Netlify](https://app.netlify.com/) with GitHub.
2. Select **Add new project** and **Import an existing project**.
3. Choose **GitHub**, authorize repository access if prompted, and select
   `dvanessa/novasaas`. The Netlify site may be named `novasaas-dashboard`.
4. Leave the Base directory empty and select `main` as the production branch.
5. Confirm `npm run build` as the build command and `.next` as the publish
   directory.
6. Add the public environment variable `NEXT_PUBLIC_APP_NAME` with the value
   `NovaSaaS`.
7. Select **Deploy**.

Only `NEXT_PUBLIC_APP_NAME=NovaSaaS` is expected. Never add passwords, API keys,
tokens, private keys, database connection strings, or other secrets to the
repository or to a `NEXT_PUBLIC_*` variable.

After the initial import, Netlify builds and deploys commits pushed to `main`.
Depending on the repository's Git and Netlify settings, pull requests may also
receive deploy previews. Verify a deployment by opening its URL, checking the
home, design-system, login, dashboard, users, and forbidden routes, and testing
the demo flows above. To redeploy, open the site's **Deploys** page and trigger
a deploy of the desired commit. To roll back, publish a previous successful
deploy from that page.

Netlify Free has usage quotas and feature limits that can change over time.
Check the current plan details and usage in the Netlify dashboard before relying
on a particular build, bandwidth, or function allowance. Do not enable paid
features or automatic credit purchases for this demo.
