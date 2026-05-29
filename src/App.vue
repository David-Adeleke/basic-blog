<script setup>
import NavBar from '@/components/NavBar.vue'
import ErrorBoundary from '@/components/ErrorBoundary.vue'
import LoadingSkeleton from '@/components/LoadingSkeleton.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

/**
 * Determine which skeleton variant to show based on the matched route.
 */
function skeletonType(r) {
  return r?.name === 'post-detail' ? 'detail' : 'grid'
}
</script>

<template>
  <div class="app-shell">
    <NavBar />

    <main id="main-content" class="main-content">
      <!--
        RouterView slot exposes the resolved Component and current route.

        Layout:
          Transition ← page-enter/leave animation
            ErrorBoundary ← catches any error from child tree (keyed per route)
              Suspense ← shows skeleton while async setup() awaits
                component ← lazy-loaded, async view component
      -->
      <RouterView v-slot="{ Component, route: r }">
        <Transition name="page" mode="out-in">
          <ErrorBoundary :key="r.path">
            <Suspense>
              <template #default>
                <component :is="Component" :key="r.path" />
              </template>

              <!-- Shown while component's async setup() is pending -->
              <template #fallback>
                <LoadingSkeleton :type="skeletonType(r)" />
              </template>
            </Suspense>
          </ErrorBoundary>
        </Transition>
      </RouterView>
    </main>

    <footer class="app-footer">
      <div class="footer-inner container">
        <div class="footer-brand">
          <span class="footer-ornament">✦</span>
          <span class="footer-name">The Chronicle</span>
        </div>
        <p class="footer-copy">
          Powered by
          <a
            href="https://api.oluwasetemi.dev/reference"
            target="_blank"
            rel="noopener noreferrer"
            class="footer-link"
          >api.oluwasetemi.dev</a>
          &mdash; Built with Vue 3 + Vue Router
        </p>
        <p class="footer-year">© {{ new Date().getFullYear() }} All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<style>
/* ─── App shell ──────────────────────────────────────────────────────────── */
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding-top: var(--nav-height);
}

/* ─── Footer ─────────────────────────────────────────────────────────────── */
.app-footer {
  padding-block: var(--sp-10) var(--sp-8);
  border-top: 1px solid var(--color-border);
  background: var(--color-bg-surface);
}

.footer-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--sp-3);
  text-align: center;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
}

.footer-ornament {
  font-size: 0.7rem;
  color: var(--color-accent);
}

.footer-name {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text-secondary);
  letter-spacing: 0.02em;
}

.footer-copy {
  font-family: var(--font-ui);
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

.footer-link {
  color: var(--color-accent);
  text-decoration: none;
  transition: color 200ms ease;
}

.footer-link:hover {
  color: var(--color-accent-hover);
}

.footer-year {
  font-family: var(--font-ui);
  font-size: 0.75rem;
  color: var(--color-text-muted);
  opacity: 0.6;
}
</style>
