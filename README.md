# Content Publisher Frontend (Vite + React + TS)

Minimal React app for the Content Publisher project. Implements auth (login/signup) and CRUD for user publications using the backend APIs.

## Prerequisites

- Node.js 18+ (recommended LTS)
- npm 9+ (bundled with Node)
- Running backend API (see `content-publisher-backend/`), or any API that matches the endpoints below

## Tech

- Vite + React 18 + TypeScript
- React Router v6
- Axios
- TailwindCSS

## Getting Started

1) Install dependencies

1) Unzip and install
```
unzip content-publisher-frontend.zip
cd content-publisher-frontend
npm install --legacy-peer-deps
```

2) Configure environment

- Create or edit `.env` in `content-publisher-frontend/` with:

```
VITE_API_BASE_URL=http://localhost:6001
```

- Point it to your backend base URL (no trailing slash).

3) Run the dev server

```
npm run dev
```

- Open the URL printed by Vite (default http://localhost:5173)

4) Build and preview production bundle

```
npm run build
npm run preview
```

## Available Scripts

- `npm run dev` — Start Vite dev server
- `npm run build` — Type-check and build for production
- `npm run preview` — Preview the production build locally
- `npm run format` — Format codebase with Prettier
- `npm run format:check` — Check formatting with Prettier

## Project Structure

```
content-publisher-frontend/
  public/
    index.html
    favicon.ico (optional)
  src/
    api/
      api_client.ts
    components/
      common/
        base_modal/
          base_modal.tsx
          index.ts
        button/
          button.tsx
          index.ts
        confirm_dialog/
          confirm_dialog.tsx
          index.ts
        search_bar/
          search_bar.tsx
          index.ts
        skeletons/
          publication_card_skeleton.tsx
          index.ts
        toasts/
          toasts.tsx
          index.ts
        index.ts
      dashboard/
        filters_bar.tsx
        publication_card.tsx
        publication_modal.tsx
        selected_publication_item.tsx
        selected_publications.tsx
        index.ts
      home/
        public_publication_card.tsx
        index.ts
      private-route/
        private-route.tsx
        index.ts
      shared/
        publication_list_state.tsx
        index.ts
    constants/
      api.ts
      config.ts
      env.ts
      http_status.ts
      messages.ts
      regex.ts
    context/
      auth_context/
        context.tsx
        provider.tsx
      toast_context/
        context.tsx
        provider.tsx
    hooks/
      use_auth.ts
      use_debounce.ts
      use_focus_trap.ts
      use_infinite_list.ts
      use_toast.ts
    layouts/
      main_layout.tsx
    pages/
      dashboard/
        dashboard.tsx
        index.ts
      home/
        home.tsx
        index.ts
      login/
        login.tsx
        index.ts
    routes/
      app_routes.tsx
    schemas/
      auth.schema.ts
      publication.schema.ts
    services/
      auth_service.ts
      publications_service.ts
    styles/
      globals.css
    types/
      auth.ts
      common.ts
      context.ts
      index.ts
      publications.ts
    utils/
      format_date.ts
    app.tsx
    index.tsx
    react_app_env.d.ts
  dist/
    ... (build output)
  package.json
  tsconfig.json
  tsconfig.tsbuildinfo
  vite.config.ts
  tailwind.config.ts
  postcss.config.js
```

## Features

- Login / Signup forms (token saved to localStorage)
- Protected `Dashboard` route using a simple `useAuth` hook
- Public `Home` route for public publications
- List, create, edit, delete publications
- Change publication status (Draft/Published)
- Search and basic status filter
- Loading and error states

## Notes

- This app expects the backend routes:
  - POST `/api/auth/login`
  - POST `/api/auth/signup`
  - GET `/api/publications`
  - GET `/api/publications/:id`
  - POST `/api/publications`
  - PUT `/api/publications/:id`
  - DELETE `/api/publications/:id`
  - DELETE `/api/publications/undo/:id`
- Authentication token (JWT) is stored in localStorage and injected via Axios interceptor.
- Tailwind is used for quick styling with utility classes.

## Troubleshooting

- If ports are busy, change the Vite dev server port in `vite.config.ts` or stop the conflicting process.
- If API requests fail, verify `VITE_API_BASE_URL` and that the backend is running and reachable.
- After changing environment variables, stop and restart the dev server.
- If dependencies seem out of sync, try `rm -rf node_modules package-lock.json && npm install`.
