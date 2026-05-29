<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'grid', // 'grid' | 'detail'
    validator: (v) => ['grid', 'detail'].includes(v)
  }
})
</script>

<template>
  <!-- Posts grid skeleton -->
  <div v-if="props.type === 'grid'" class="skeleton-page">
    <div class="container">
      <!-- Hero header skeleton -->
      <div class="skeleton-hero">
        <div class="skeleton-line hero-tag"></div>
        <div class="skeleton-line hero-title"></div>
        <div class="skeleton-line hero-sub"></div>
      </div>

      <!-- Cards grid skeleton -->
      <div class="skeleton-grid">
        <div v-for="i in 6" :key="i" class="skeleton-card">
          <div class="skeleton-line card-image"></div>
          <div class="skeleton-card-body">
            <div class="skeleton-line card-tag"></div>
            <div class="skeleton-line card-title"></div>
            <div class="skeleton-line card-title-short"></div>
            <div class="skeleton-line card-excerpt"></div>
            <div class="skeleton-line card-excerpt"></div>
            <div class="skeleton-line card-excerpt short"></div>
            <div class="skeleton-card-meta">
              <div class="skeleton-line meta-dot"></div>
              <div class="skeleton-line meta-text"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Post detail skeleton -->
  <div v-else-if="props.type === 'detail'" class="skeleton-page">
    <div class="reading-container">
      <div class="skeleton-detail">
        <div class="skeleton-line detail-back"></div>
        <div class="skeleton-line detail-tag"></div>
        <div class="skeleton-line detail-title"></div>
        <div class="skeleton-line detail-title-short"></div>
        <div class="skeleton-line detail-meta"></div>
        <div class="skeleton-divider"></div>
        <div v-for="i in 8" :key="i" class="skeleton-line detail-body"></div>
        <div class="skeleton-line detail-body short"></div>
        <br />
        <div v-for="i in 6" :key="`b${i}`" class="skeleton-line detail-body"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.skeleton-page {
  padding-block: var(--sp-16) var(--sp-24);
  animation: pulse 1.8s ease-in-out infinite;
}

/* ── Hero ── */
.skeleton-hero {
  text-align: center;
  padding-block: var(--sp-16) var(--sp-12);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--sp-4);
}

.hero-tag   { width: 80px;  height: 14px; }
.hero-title { width: 420px; height: 48px; max-width: 90%; border-radius: var(--radius-sm); }
.hero-sub   { width: 300px; height: 16px; max-width: 80%; }

/* ── Grid ── */
.skeleton-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--sp-6);
}

.skeleton-card {
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.card-image  { height: 180px; border-radius: 0; }
.skeleton-card-body { padding: var(--sp-5); }
.card-tag    { width: 60px;  height: 12px; margin-bottom: var(--sp-3); }
.card-title  { width: 100%; height: 22px; margin-bottom: var(--sp-2); }
.card-title-short { width: 70%; height: 22px; margin-bottom: var(--sp-4); }
.card-excerpt { width: 100%; height: 14px; margin-bottom: var(--sp-2); }
.card-excerpt.short { width: 60%; }

.skeleton-card-meta {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  margin-top: var(--sp-5);
}

.meta-dot  { width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0; }
.meta-text { width: 120px; height: 12px; }

/* ── Detail ── */
.skeleton-detail {
  padding-block: var(--sp-12) var(--sp-20);
  display: flex;
  flex-direction: column;
  gap: var(--sp-4);
}

.detail-back       { width: 100px; height: 14px; }
.detail-tag        { width: 70px;  height: 12px; }
.detail-title      { width: 100%; height: 40px; }
.detail-title-short { width: 75%; height: 40px; }
.detail-meta       { width: 240px; height: 14px; }

.skeleton-divider {
  height: 1px;
  background: var(--color-border);
  margin-block: var(--sp-4);
}

.detail-body { width: 100%; height: 14px; }
.detail-body.short { width: 55%; }
</style>
