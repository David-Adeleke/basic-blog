<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchPost, formatDate, readingTime } from '@/services/api.js'

const route  = useRoute()
const router = useRouter()

/**
 * Top-level await triggers Suspense until the post is loaded.
 * If fetchPost() throws (e.g. 404), the ErrorBoundary catches it.
 */
const post = await fetchPost(route.params.id)

const formattedDate = computed(() => formatDate(post.createdAt))
const timeToRead    = computed(() => readingTime(post.wordCount))

/* Render body paragraphs (split on blank lines) */
const paragraphs = computed(() =>
  post.body
    .split(/\n\n+/)
    .map(p => p.trim())
    .filter(Boolean)
)

function goBack() {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}
</script>

<template>
  <article class="detail-page">
    <div class="reading-container">

      <!-- ── Back Navigation ── -->
      <nav class="detail-nav reveal-up">
        <button class="back-btn" @click="goBack" aria-label="Go back">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 3L5 8l5 5"
              stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Back
        </button>
        <RouterLink to="/" class="home-crumb">The Chronicle</RouterLink>
      </nav>

      <!-- ── Post header ── -->
      <header class="detail-header reveal-up reveal-delay-1">
        <!-- Tags -->
        <div v-if="post.tags.length" class="detail-tags">
          <span v-for="tag in post.tags" :key="tag" class="detail-tag">
            {{ tag }}
          </span>
        </div>

        <!-- Title -->
        <h1 class="detail-title">{{ post.title }}</h1>

        <!-- Meta: author · date · reading time -->
        <div class="detail-meta">
          <div class="meta-author-block">
            <div class="meta-avatar-lg">{{ post.author.charAt(0).toUpperCase() }}</div>
            <div>
              <div class="meta-author-name">{{ post.author }}</div>
              <div class="meta-secondary">
                <time :datetime="post.createdAt">{{ formattedDate }}</time>
                <span class="meta-sep">·</span>
                <span>{{ timeToRead }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Cover image -->
        <div v-if="post.image" class="detail-cover reveal-up reveal-delay-2">
          <img :src="post.image" :alt="post.title" />
        </div>
      </header>

      <!-- ── Divider ── -->
      <div class="detail-divider reveal-up reveal-delay-2" aria-hidden="true">
        <span></span><span class="div-gem">◆</span><span></span>
      </div>

      <!-- ── Post body ── -->
      <div class="detail-body reveal-up reveal-delay-3">
        <template v-if="paragraphs.length">
          <p
            v-for="(para, i) in paragraphs"
            :key="i"
            class="body-para"
            :class="{ 'para--lead': i === 0 }"
          >{{ para }}</p>
        </template>
        <p v-else class="body-empty">No content available for this post.</p>
      </div>

      <!-- ── Footer actions ── -->
      <footer class="detail-footer reveal-up reveal-delay-4">
        <div class="footer-divider" aria-hidden="true"></div>
        <div class="footer-actions">
          <button class="btn-back" @click="goBack">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M9 2L4 7l5 5"
                stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Previous page
          </button>
          <RouterLink to="/" class="btn-home">
            All posts
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 7h12M8 2l5 5-5 5"
                stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </RouterLink>
        </div>
      </footer>

    </div>
  </article>
</template>

<style scoped>
.detail-page {
  padding-block: var(--sp-6) var(--sp-24);
}

/* ── Back nav ── */
.detail-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-block: var(--sp-8) var(--sp-6);
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--sp-2);
  font-family: var(--font-ui);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  background: transparent;
  border: none;
  padding: var(--sp-2) 0;
  cursor: pointer;
  transition: color 200ms ease, transform 200ms ease;
}

.back-btn:hover {
  color: var(--color-accent);
  transform: translateX(-3px);
}

.home-crumb {
  font-family: var(--font-ui);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  transition: color 200ms ease;
}

.home-crumb:hover {
  color: var(--color-accent);
}

/* ── Header ── */
.detail-header {
  margin-bottom: var(--sp-8);
}

.detail-tags {
  display: flex;
  gap: var(--sp-2);
  flex-wrap: wrap;
  margin-bottom: var(--sp-5);
}

.detail-tag {
  font-family: var(--font-ui);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-accent);
  background: var(--color-accent-dim);
  border: 1px solid rgba(200, 151, 58, 0.2);
  padding: 3px 10px;
  border-radius: 99px;
}

.detail-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3.2rem);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--color-text);
  margin-bottom: var(--sp-8);
}

/* ── Meta block ── */
.detail-meta {
  margin-bottom: var(--sp-8);
}

.meta-author-block {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
}

.meta-avatar-lg {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--color-accent-dim);
  border: 1px solid var(--color-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-accent);
  flex-shrink: 0;
}

.meta-author-name {
  font-family: var(--font-ui);
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 2px;
}

.meta-secondary {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  font-family: var(--font-ui);
  font-size: 0.8rem;
  color: var(--color-text-secondary);
}

.meta-sep {
  color: var(--color-text-muted);
}

/* ── Cover image ── */
.detail-cover {
  margin-top: var(--sp-8);
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--color-border);
}

.detail-cover img {
  width: 100%;
  max-height: 420px;
  object-fit: cover;
}

/* ── Divider ── */
.detail-divider {
  display: flex;
  align-items: center;
  gap: var(--sp-4);
  margin-block: var(--sp-8) var(--sp-10);
}

.detail-divider span:not(.div-gem) {
  flex: 1;
  height: 1px;
  background: var(--color-border);
}

.div-gem {
  font-size: 0.55rem;
  color: var(--color-accent);
  flex: 0;
}

/* ── Body ── */
.detail-body {
  font-family: var(--font-body);
  font-size: 1.15rem;
  line-height: 1.85;
  color: var(--color-text);
}

.body-para {
  margin-bottom: var(--sp-6);
}

.body-para.para--lead {
  font-size: 1.22rem;
  color: var(--color-text);
  font-style: italic;
}

.body-empty {
  font-style: italic;
  color: var(--color-text-secondary);
  text-align: center;
  padding-block: var(--sp-12);
}

/* ── Footer ── */
.detail-footer {
  margin-top: var(--sp-16);
}

.footer-divider {
  height: 1px;
  background: var(--color-border);
  margin-bottom: var(--sp-8);
}

.footer-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--sp-4);
}

.btn-back,
.btn-home {
  display: inline-flex;
  align-items: center;
  gap: var(--sp-2);
  font-family: var(--font-ui);
  font-size: 0.875rem;
  font-weight: 500;
  padding: var(--sp-3) var(--sp-5);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  background: transparent;
  color: var(--color-text-secondary);
  transition: all 200ms ease;
  text-decoration: none;
  cursor: pointer;
}

.btn-back:hover {
  border-color: var(--color-border-hover);
  color: var(--color-text);
  background: var(--color-bg-elevated);
  transform: translateX(-2px);
}

.btn-home {
  border-color: var(--color-accent);
  color: var(--color-accent);
  background: var(--color-accent-dim);
}

.btn-home:hover {
  background: var(--color-accent);
  color: #0a0a0a;
  box-shadow: 0 0 20px var(--color-accent-glow);
  transform: translateX(2px);
}
</style>
