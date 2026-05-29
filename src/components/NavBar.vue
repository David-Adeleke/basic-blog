<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const scrolled = ref(false)
const menuOpen = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 20
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="navbar" :class="{ 'navbar--scrolled': scrolled }">
    <div class="navbar__inner container">
      <!-- Wordmark -->
      <RouterLink to="/" class="navbar__brand">
        <span class="brand-ornament">✦</span>
        <span class="brand-name">The Chronicle</span>
      </RouterLink>

      <!-- Desktop nav links -->
      <nav class="navbar__links">
        <RouterLink to="/" class="nav-link" :class="{ active: route.name === 'home' }">
          Home
        </RouterLink>
        <a
          href="https://api.oluwasetemi.dev/reference"
          target="_blank"
          rel="noopener noreferrer"
          class="nav-link nav-link--external"
        >
          API Docs
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5V6.5"
              stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: var(--nav-height);
  transition: background 300ms ease, box-shadow 300ms ease, border-color 300ms ease;
  border-bottom: 1px solid transparent;
}

.navbar--scrolled {
  background: rgba(8, 8, 8, 0.9);
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  border-bottom-color: var(--color-border);
  box-shadow: 0 1px 32px rgba(0,0,0,0.4);
}

.navbar__inner {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* ── Brand ── */
.navbar__brand {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  text-decoration: none;
  transition: opacity 200ms ease;
}

.navbar__brand:hover { opacity: 0.8; }

.brand-ornament {
  font-size: 0.9rem;
  color: var(--color-accent);
  line-height: 1;
}

.brand-name {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text);
  letter-spacing: 0.01em;
}

/* ── Links ── */
.navbar__links {
  display: flex;
  align-items: center;
  gap: var(--sp-6);
}

.nav-link {
  font-family: var(--font-ui);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  text-decoration: none;
  transition: color 200ms ease;
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--color-accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 250ms var(--ease-out-quart);
}

.nav-link:hover,
.nav-link.active {
  color: var(--color-text);
}

.nav-link:hover::after,
.nav-link.active::after {
  transform: scaleX(1);
}

.nav-link--external {
  display: flex;
  align-items: center;
  gap: 5px;
  color: var(--color-text-muted);
}

.nav-link--external:hover {
  color: var(--color-accent);
}

.nav-link--external::after { display: none; }
</style>
