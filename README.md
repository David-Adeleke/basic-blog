# The Chronicle — Vue 3 Blog App

A production-grade blog application built with **Vue 3** + **Vue Router 4**, featuring lazy loading, Suspense, and Error Boundaries.

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Vue 3 (Composition API, `<script setup>`) |
| Routing | Vue Router 4 |
| Build | Vite 6 |
| API | [api.oluwasetemi.dev](https://api.oluwasetemi.dev) |
| Fonts | Playfair Display · EB Garamond · DM Sans |

---

## Project Structure

```
blog-app/
├── index.html                   ← HTML entry point + Google Fonts
├── package.json
├── vite.config.js
└── src/
    ├── main.js                  ← App bootstrap (createApp + router)
    ├── App.vue                  ← Root layout (NavBar + RouterView + Footer)
    │
    ├── router/
    │   └── index.js             ← Routes with lazy loading + 404 catch-all
    │
    ├── services/
    │   └── api.js               ← fetchPosts(), fetchPost(), formatDate(), readingTime()
    │
    ├── views/
    │   ├── HomeView.vue         ← Posts grid (async setup → triggers Suspense)
    │   ├── PostDetailView.vue   ← Single post (async setup → triggers Suspense)
    │   └── NotFoundView.vue     ← 404 fallback page
    │
    ├── components/
    │   ├── NavBar.vue           ← Fixed top navbar with scroll-blur effect
    │   ├── PostCard.vue         ← Post card with hover animation
    │   ├── ErrorBoundary.vue    ← onErrorCaptured – catches async/render errors
    │   └── LoadingSkeleton.vue  ← Shimmer skeleton (grid & detail variants)
    │
    └── assets/styles/
        ├── main.css             ← Design tokens, reset, typography
        └── animations.css       ← Page transitions, shimmer, reveal keyframes
```

---

## Key Features

### 🔀 Vue Router with Lazy Loading
All route components use dynamic `import()`, so each view is code-split into a separate chunk:

```js
// router/index.js
component: () => import('@/views/HomeView.vue')
```

### ⏳ Suspense + Async Setup
Views use **top-level `await`** inside `<script setup>`, making them async components that trigger `<Suspense>`:

```vue
<!-- HomeView.vue -->
<script setup>
const posts = await fetchPosts()  // Suspense waits for this
</script>
```

### 🛡️ Error Boundary
`ErrorBoundary.vue` wraps every route using `onErrorCaptured` to catch errors from:
- Failed API calls
- 404 posts
- Any runtime component error

### 🔁 404 Handling
A catch-all route redirects any unknown path to `NotFoundView.vue`:

```js
{ path: '/:pathMatch(.*)*', component: () => import('@/views/NotFoundView.vue') }
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## API Endpoints Used

| Method | URL | Description |
|---|---|---|
| `GET` | `/posts` | Fetch all blog posts |
| `GET` | `/posts/:id` | Fetch a single post by ID |

The `api.js` service normalises multiple possible response shapes (`array`, `{ data: [] }`, etc.) into a consistent post object.
