# Next.js & React Development Rules

## Next.js Version & Documentation

- Follow the project's installed Next.js version and conventions.
- Before implementing Next.js features, check the relevant documentation in `node_modules/next/dist/docs/` when available.
- Do not rely on outdated Next.js patterns or APIs.
- Follow current App Router conventions and recommended Next.js architecture.

## React Best Practices

- Prefer simple, declarative, and predictable React components.
- Use Server Components by default.
- Use Client Components only when client-side interactivity, browser APIs, or React hooks are required.
- Keep components focused on a single responsibility.
- Avoid unnecessary state, effects, re-renders, and client-side JavaScript.
- Do not use `useEffect` for data fetching when the data can be fetched on the server.
- Use stable keys when rendering lists.
- Avoid prop drilling when a better component or composition pattern is appropriate.

## Data Fetching & SSR

- Prefer server-side data fetching for SEO-critical and initial page data.
- Fetch data in Server Components whenever possible.
- Keep sensitive API calls, database queries, and server-only logic on the server.
- Use Server Actions where appropriate for server-side mutations.
- Do not fetch the same data repeatedly when it can be shared, cached, or passed through the component tree.
- Use appropriate Next.js caching and revalidation strategies based on the data's requirements.
- Use client-side fetching only when the data genuinely requires browser-side updates or interaction.

## SEO

- Prioritize server-rendered content for pages that need to be indexed.
- Use Next.js `metadata` and `generateMetadata` appropriately.
- Provide meaningful titles, descriptions, canonical URLs, Open Graph metadata, and other relevant metadata.
- Use semantic HTML and proper heading hierarchy.
- Ensure important page content is available in the initial server-rendered HTML.
- Do not make SEO-critical content dependent on client-side JavaScript.

## TypeScript

- Use TypeScript strict mode.
- Never use `any`.
- Never use `unknown` unless there is a clear and necessary type-safety reason, and narrow it properly before use.
- Never use `@ts-ignore`, `@ts-nocheck`, or similar TypeScript suppression comments.
- Never use `eslint-disable` to bypass code-quality or type-safety rules.
- Define explicit interfaces, types, unions, and generics where appropriate.
- Prefer type-safe APIs and reusable domain types over duplicated inline types.
- Fix the underlying type error instead of suppressing it.

## Types & Type Organization

- Keep shared TypeScript types, interfaces, enums, unions, and type definitions in the project's dedicated `types/` directory.
- Organize types by domain or feature when appropriate, for example:
  - `types/user.ts`
  - `types/product.ts`
  - `types/order.ts`
  - `types/api.ts`
- Do not duplicate the same type definition across multiple files.
- Reuse existing types before creating new ones.
- Keep component-specific types inside the component only when they are truly local and not reusable elsewhere.
- Move types to the `types/` directory when they are shared across components, pages, features, API layers, services, or server/client boundaries.
- Prefer explicit interfaces, type aliases, discriminated unions, and generics over loose or implicit typing.
- Never use `any`.
- Avoid `unknown` unless it is genuinely required; narrow it safely before use.
- Keep API request/response types, database/domain types, form types, and shared UI types clearly separated when their responsibilities differ.
- Do not place large collections of unrelated types in a single `types/index.ts` file.
- Use barrel exports only when they improve discoverability and do not create circular dependencies.
- Types should have clear, consistent, domain-specific names.
- When a type changes, update all consumers rather than creating duplicate or slightly different versions of the same type.

## Components & Reusability

- Build reusable components for repeated UI patterns and behavior.
- Follow DRY (Don't Repeat Yourself).
- Avoid creating overly large components.
- Keep component-specific types local only when they are not shared.
- Move shared types to the dedicated `types/` directory.
- Extract complex logic into reusable hooks, utilities, services, or domain modules when appropriate.
- Keep business logic separate from presentation logic when practical.
- Prefer composition over duplicated or deeply conditional components.
- Avoid premature abstraction; extract components when reuse or separation of responsibility provides a clear benefit.

## Maintainability

- Keep files and functions focused and reasonably small.
- Use clear and consistent naming.
- Organize code according to the project's established architecture.
- Avoid duplicated business logic, API calls, validation, and transformation logic.
- Prefer simple solutions over unnecessary abstractions.
- Handle loading, error, empty, and success states explicitly where applicable.
- Do not introduce dependencies when native Next.js, React, or existing project utilities are sufficient.

## Environment Variables & Security

- Never expose secrets, private API keys, database credentials, tokens, or other sensitive values to the client.
- Only expose environment variables to browser code when they are intentionally prefixed with `NEXT_PUBLIC_`.
- Keep server-only environment variables in Server Components, Server Actions, Route Handlers, or other server-only modules.
- Never hardcode secrets or credentials in source code.
- Never commit `.env`, `.env.local`, or other secret-containing files.
- Validate required environment variables on the server.
- Avoid accidentally leaking server-side values through props, API responses, logs, error messages, or client bundles.

## API & Database

- Keep database access on the server.
- Use the project's existing API/data layer instead of duplicating access logic.
- Validate external input before using it.
- Return only the data required by the client.
- Do not expose internal database fields or sensitive information unnecessarily.
- Handle API and database errors explicitly and safely.

## Code Quality

- Follow the project's ESLint and formatting rules.
- Do not bypass linting or type checking to make builds pass.
- Prefer readable, maintainable code over clever implementations.
- Before finishing a change, verify TypeScript, ESLint, and build errors.
- When fixing an error, address the root cause rather than suppressing it.

## File & Component Size

- Keep individual source files under **500 lines of code**.
- Keep React components under **500 lines of code**.
- **Exception:** shadcn/ui components are exempt from the 500-line limit because they are generated UI primitives and should generally be kept close to their original implementation.
- If a non-shadcn file or component approaches 500 lines, refactor it before adding more code.
- Split large components into smaller, reusable components with clear responsibilities.
- Extract reusable logic into hooks, utilities, services, or domain modules when appropriate.
- Do not artificially split code just to meet the limit; split it based on responsibility and maintainability.
- Avoid large monolithic files, components, functions, and modules.
- Prefer focused, composable modules that are easy to understand, test, and maintain.

## Core Principle

Write code that is **server-first, type-safe, SEO-friendly, reusable, secure, performant, and easy to maintain**. Prefer the simplest architecture that follows current Next.js and React best practices.
