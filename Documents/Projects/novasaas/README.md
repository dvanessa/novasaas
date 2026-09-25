# NovaSaaS — Premium Next.js Admin Dashboard

NovaSaaS is a premium foundation for a modern SaaS admin dashboard.

## Current status

**Step 4 — Frontend Demo Authentication**

This project includes the Step 1 foundation, Step 2 design system, Step 3 dashboard shell, and a frontend-only demo authentication layer with persisted sessions, demo roles, permission checks, protected routes, and forbidden-state handling. No production authentication is implemented.

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
- Theme changes are applied without hydration mismatches thanks to `suppressHydrationWarning` on the root html element
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

Authentication demonstrations are available at `/auth/login`, `/auth/register`, `/auth/signup`, `/auth/forgot-password`, `/auth/reset-password`, and `/auth/verify-email`. Demo sessions are stored in browser local storage only. The dashboard at `/dashboard` is protected, and insufficient permissions route to `/forbidden`. Use the demo account switcher in the user menu to explore Super Admin, Manager, and Member roles.

The dashboard placeholder routes include `/analytics`, `/organizations`, `/users`, `/roles`, `/subscriptions`, `/billing`, `/billing/invoices`, `/notifications`, `/audit-log`, and `/settings` with `/settings/appearance`, `/settings/billing`, `/settings/organization`, `/settings/profile`, and `/settings/security`. Use **Cmd/Ctrl+K** to open the command menu. The root page remains a minimal entry page with a dashboard link.

Auth forms use React Hook Form with Zod schemas and accessible field-level
messages. Registration, password recovery, and password reset remain simulated
frontend demonstrations; they do not send emails, store passwords, or call a
backend. The demo accounts are centralized in `src/config/auth.config.ts`;
their fixture password is kept in the configuration and is never persisted;
persisted sessions contain only an account ID and timestamp. The Vitest suite
covers schema validation and demo-session persistence.

Authentication types are centralized in `src/types/auth.ts` and
`src/types/permissions.ts`. Stable role identifiers are `super_admin`,
`manager`, and `member`; human-readable role labels are presentation-only.

The design-system showcase remains available at:

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

This project remains frontend-only. Step 4 authentication is intentionally simulated: there is no backend, database, API layer, OAuth, JWT, password encryption, real token, or payment processing. Replace the demo auth service with a real server-backed identity system before production use.

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
