<script setup>
import { ref, onErrorCaptured } from 'vue'

const props = defineProps({
  message: {
    type: String,
    default: 'Something went wrong while loading this content.'
  }
})

const error = ref(null)

/**
 * onErrorCaptured catches errors propagated from any descendant component,
 * including errors thrown inside async setup() / Suspense.
 * Returning `false` stops the error from propagating further up the tree.
 */
onErrorCaptured((err) => {
  error.value = err
  return false
})

function reset() {
  error.value = null
}
</script>

<template>
  <!-- Error state — shown when any descendant throws -->
  <div v-if="error" class="error-boundary">
    <div class="error-boundary__inner">
      <div class="error-boundary__icon">&#9888;</div>
      <h2 class="error-boundary__title">Something went wrong</h2>
      <p class="error-boundary__message">
        {{ error.message || props.message }}
      </p>
      <div class="error-boundary__actions">
        <button class="btn btn--accent" @click="reset">Try again</button>
        <RouterLink to="/" class="btn btn--ghost">Back to Home</RouterLink>
      </div>
    </div>
  </div>

  <!-- Default slot — rendered when no error is active -->
  <slot v-else />
</template>

<style scoped>
.error-boundary {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: var(--sp-8);
}

.error-boundary__inner {
  text-align: center;
  max-width: 480px;
}

.error-boundary__icon {
  font-size: 3rem;
  color: var(--color-error);
  margin-bottom: var(--sp-5);
  opacity: 0.8;
}

.error-boundary__title {
  font-family: var(--font-display);
  font-size: 1.8rem;
  color: var(--color-text);
  margin-bottom: var(--sp-3);
}

.error-boundary__message {
  font-family: var(--font-ui);
  font-size: 0.95rem;
  color: var(--color-text-secondary);
  margin-bottom: var(--sp-8);
  line-height: 1.6;
  padding: var(--sp-4) var(--sp-5);
  background: var(--color-error-dim);
  border: 1px solid rgba(192, 57, 43, 0.2);
  border-radius: var(--radius-md);
}

.error-boundary__actions {
  display: flex;
  gap: var(--sp-3);
  justify-content: center;
  flex-wrap: wrap;
}

/* ── Shared button styles ── */
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--sp-2);
  padding: var(--sp-3) var(--sp-6);
  border-radius: var(--radius-md);
  font-family: var(--font-ui);
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.03em;
  transition: background 200ms ease, color 200ms ease, transform 150ms ease, box-shadow 200ms ease;
  cursor: pointer;
  text-decoration: none;
}

.btn:active { transform: scale(0.97); }

.btn--accent {
  background: var(--color-accent);
  color: #0a0a0a;
  border: 1px solid var(--color-accent);
}
.btn--accent:hover {
  background: var(--color-accent-hover);
  border-color: var(--color-accent-hover);
  box-shadow: 0 0 20px var(--color-accent-glow);
}

.btn--ghost {
  background: transparent;
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
}
.btn--ghost:hover {
  color: var(--color-text);
  border-color: var(--color-border-hover);
  background: var(--color-bg-hover);
}
</style>
