<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goBack() {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}
</script>

<template>
  <section class="not-found">
    <div class="container">
      <div class="nf-inner">

        <!-- Floating ornament -->
        <div class="nf-ornament" aria-hidden="true">
          <div class="ornament-circle">
            <span class="ornament-glyph">✦</span>
          </div>
        </div>

        <!-- Large 404 -->
        <p class="nf-code" aria-hidden="true">404</p>

        <!-- Message -->
        <h1 class="nf-title">Page not found</h1>
        <p class="nf-subtitle">
          The page you're looking for has either been moved, deleted, or never existed in the first place.
          Every great story has its loose ends.
        </p>

        <!-- Actions -->
        <div class="nf-actions">
          <RouterLink to="/" class="nf-btn nf-btn--primary">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M7 1L1 7l6 6M1 7h12"
                stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Back to Home
          </RouterLink>
          <button class="nf-btn nf-btn--ghost" @click="goBack">
            Previous page
          </button>
        </div>

        <!-- Decorative HR -->
        <div class="nf-divider" aria-hidden="true">
          <span></span><span class="div-diamond">◇</span><span></span>
        </div>

        <p class="nf-footnote">
          If you followed a link here, you may want to
          <a href="https://api.oluwasetemi.dev/reference" target="_blank" rel="noopener">
            check the API docs
          </a>
          for valid routes.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.not-found {
  min-height: calc(100vh - var(--nav-height));
  display: flex;
  align-items: center;
  justify-content: center;
  padding-block: var(--sp-20);
}

.nf-inner {
  text-align: center;
  max-width: 560px;
  margin-inline: auto;
}

/* ── Ornament ── */
.nf-ornament {
  display: flex;
  justify-content: center;
  margin-bottom: var(--sp-8);
}

.ornament-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 1px solid var(--color-accent);
  background: var(--color-accent-dim);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: float 3s ease-in-out infinite;
}

.ornament-glyph {
  font-size: 1.8rem;
  color: var(--color-accent);
}

/* ── 404 number ── */
.nf-code {
  font-family: var(--font-display);
  font-size: clamp(5rem, 18vw, 9rem);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.04em;
  color: transparent;
  -webkit-text-stroke: 1px var(--color-border-hover);
  margin-bottom: var(--sp-4);
  user-select: none;
}

/* ── Headings ── */
.nf-title {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 4vw, 2.2rem);
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: var(--sp-4);
}

.nf-subtitle {
  font-family: var(--font-body);
  font-size: 1.05rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
  font-style: italic;
  margin-bottom: var(--sp-10);
}

/* ── Actions ── */
.nf-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--sp-3);
  flex-wrap: wrap;
  margin-bottom: var(--sp-10);
}

.nf-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--sp-2);
  padding: var(--sp-3) var(--sp-6);
  border-radius: var(--radius-md);
  font-family: var(--font-ui);
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  text-decoration: none;
  cursor: pointer;
  transition: all 200ms ease;
}

.nf-btn:active { transform: scale(0.97); }

.nf-btn--primary {
  background: var(--color-accent);
  color: #080808;
  border: 1px solid var(--color-accent);
}

.nf-btn--primary:hover {
  background: var(--color-accent-hover);
  border-color: var(--color-accent-hover);
  box-shadow: 0 0 24px var(--color-accent-glow);
}

.nf-btn--ghost {
  background: transparent;
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
}

.nf-btn--ghost:hover {
  color: var(--color-text);
  border-color: var(--color-border-hover);
  background: var(--color-bg-elevated);
}

/* ── Divider ── */
.nf-divider {
  display: flex;
  align-items: center;
  gap: var(--sp-4);
  margin-bottom: var(--sp-6);
}

.nf-divider span:not(.div-diamond) {
  flex: 1;
  height: 1px;
  background: var(--color-border);
}

.div-diamond {
  font-size: 0.6rem;
  color: var(--color-text-muted);
}

/* ── Footnote ── */
.nf-footnote {
  font-family: var(--font-ui);
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

.nf-footnote a {
  color: var(--color-accent);
  text-decoration: none;
  transition: color 200ms ease;
}

.nf-footnote a:hover {
  color: var(--color-accent-hover);
  text-decoration: underline;
}
</style>
