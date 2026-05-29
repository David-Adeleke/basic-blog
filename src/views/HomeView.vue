<script setup>
import { fetchPosts } from '@/services/api.js'
import PostCard from '@/components/PostCard.vue'

/**
 * Top-level await in <script setup> makes this component async.
 * Vue's <Suspense> will render the #fallback slot until this
 * promise resolves, then swap in the component content.
 */
const posts = await fetchPosts()
</script>

<template>
  <section class="home-page">
    <div class="container">

      <!-- ── Hero ── -->
      <header class="home-hero reveal-up">
        <div class="hero-eyebrow">
          <span class="eyebrow-ornament">✦</span>
          <span class="eyebrow-text">Latest from the newsroom</span>
        </div>
        <h1 class="hero-title">
          The <em>Chronicle</em>
        </h1>
        <p class="hero-subtitle">
          Stories, perspectives, and insights — curated and delivered fresh.
        </p>
        <div class="hero-divider">
          <span></span><span class="divider-gem">◆</span><span></span>
        </div>
      </header>

      <!-- ── Posts grid ── -->
      <div v-if="posts.length" class="posts-grid">
        <PostCard
          v-for="(post, i) in posts"
          :key="post.id"
          :post="post"
          :index="i"
        />
      </div>

      <!-- ── Empty state ── -->
      <div v-else class="empty-state reveal-up">
        <div class="empty-icon">📭</div>
        <h3 class="empty-title">No posts yet</h3>
        <p class="empty-desc">The API returned an empty list. Check back soon!</p>
      </div>

    </div>
  </section>
</template>

<style scoped>
.home-page {
  padding-block: var(--sp-4) var(--sp-24);
}

/* ── Hero ── */
.home-hero {
  text-align: center;
  padding-block: var(--sp-20) var(--sp-14);
  position: relative;
}

.hero-eyebrow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--sp-2);
  margin-bottom: var(--sp-5);
}

.eyebrow-ornament {
  font-size: 0.65rem;
  color: var(--color-accent);
}

.eyebrow-text {
  font-family: var(--font-ui);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.hero-title {
  font-family: var(--font-display);
  font-size: clamp(3rem, 8vw, 5.5rem);
  font-weight: 900;
  line-height: 1.05;
  color: var(--color-text);
  margin-bottom: var(--sp-5);
  letter-spacing: -0.02em;
}

.hero-title em {
  font-style: italic;
  color: var(--color-accent);
}

.hero-subtitle {
  font-family: var(--font-body);
  font-size: 1.15rem;
  color: var(--color-text-secondary);
  max-width: 480px;
  margin-inline: auto;
  font-style: italic;
  line-height: 1.6;
}

.hero-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--sp-4);
  margin-top: var(--sp-10);
}

.hero-divider span:not(.divider-gem) {
  flex: 1;
  max-width: 120px;
  height: 1px;
  background: linear-gradient(
    to var(--dir, right),
    transparent,
    var(--color-border-hover)
  );
}

.hero-divider span:first-child { --dir: right; }
.hero-divider span:last-child  { --dir: left; }

.divider-gem {
  font-size: 0.6rem;
  color: var(--color-accent);
  flex: 0;
}

/* ── Posts grid ── */
.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--sp-6);
}

@media (max-width: 720px) {
  .posts-grid {
    grid-template-columns: 1fr;
    gap: var(--sp-4);
  }
}

/* ── Empty state ── */
.empty-state {
  text-align: center;
  padding-block: var(--sp-20);
}

.empty-icon {
  font-size: 3.5rem;
  margin-bottom: var(--sp-5);
}

.empty-title {
  font-family: var(--font-display);
  font-size: 1.5rem;
  color: var(--color-text);
  margin-bottom: var(--sp-3);
}

.empty-desc {
  font-family: var(--font-ui);
  font-size: 0.95rem;
  color: var(--color-text-secondary);
}
</style>
