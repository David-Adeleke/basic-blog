<script setup>
import { computed } from 'vue'
import { formatDate, readingTime } from '@/services/api.js'

const props = defineProps({
  post: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    default: 0
  }
})

const formattedDate = computed(() => formatDate(props.post.createdAt))
const timeToRead = computed(() => readingTime(props.post.wordCount))

/* Rotate through accent hue variants for visual variety */
const tagColors = ['#c8973a', '#7ba7bc', '#9b8bbf', '#76a86a', '#bc7b7b']
const tagColor = computed(() => tagColors[props.post.id % tagColors.length] || tagColors[0])

const delayClass = computed(() => `reveal-delay-${Math.min(props.index + 1, 6)}`)
</script>

<template>
  <RouterLink
    :to="{ name: 'post-detail', params: { id: post.id } }"
    class="post-card reveal-up"
    :class="delayClass"
  >
    <!-- Cover image (optional) -->
    <div v-if="post.image" class="post-card__image-wrap">
      <img
        :src="post.image"
        :alt="post.title"
        class="post-card__image"
        loading="lazy"
      />
      <div class="post-card__image-overlay" />
    </div>
    <div v-else class="post-card__placeholder">
      <span class="placeholder-glyph">✦</span>
    </div>

    <!-- Card body -->
    <div class="post-card__body">
      <!-- Tags -->
      <div v-if="post.tags.length" class="post-card__tags">
        <span
          v-for="tag in post.tags.slice(0, 2)"
          :key="tag"
          class="tag"
          :style="{ '--tag-color': tagColor }"
        >{{ tag }}</span>
      </div>

      <!-- Title -->
      <h2 class="post-card__title">{{ post.title }}</h2>

      <!-- Excerpt -->
      <p class="post-card__excerpt">{{ post.excerpt }}</p>

      <!-- Meta row -->
      <div class="post-card__meta">
        <div class="meta-author">
          <div class="meta-avatar">
            {{ post.author.charAt(0).toUpperCase() }}
          </div>
          <div class="meta-info">
            <span class="meta-name">{{ post.author }}</span>
            <span class="meta-divider">·</span>
            <span class="meta-date">{{ formattedDate }}</span>
          </div>
        </div>
        <span class="meta-reading">{{ timeToRead }}</span>
      </div>

      <!-- Read more cue -->
      <div class="post-card__cta">
        <span>Read article</span>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M1 7h12M8 2l5 5-5 5"
            stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.post-card {
  display: flex;
  flex-direction: column;
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  text-decoration: none;
  transition:
    transform 280ms var(--ease-out-quart),
    box-shadow 280ms var(--ease-out-quart),
    border-color 280ms ease;
  cursor: pointer;
}

.post-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-card-hover);
  border-color: var(--color-accent);
}

/* ── Image / Placeholder ── */
.post-card__image-wrap {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.post-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 500ms ease;
}

.post-card:hover .post-card__image {
  transform: scale(1.04);
}

.post-card__image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.55));
}

.post-card__placeholder {
  height: 160px;
  background: var(--color-bg-elevated);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.post-card__placeholder::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 50% 50%, var(--color-accent-dim) 0%, transparent 70%);
  transition: opacity 300ms ease;
  opacity: 0;
}

.post-card:hover .post-card__placeholder::before {
  opacity: 1;
}

.placeholder-glyph {
  font-size: 2rem;
  color: var(--color-text-muted);
  transition: color 300ms ease, transform 300ms var(--ease-spring);
}

.post-card:hover .placeholder-glyph {
  color: var(--color-accent);
  transform: rotate(45deg) scale(1.2);
}

/* ── Body ── */
.post-card__body {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: var(--sp-5) var(--sp-6) var(--sp-6);
  gap: var(--sp-3);
}

/* ── Tags ── */
.post-card__tags {
  display: flex;
  gap: var(--sp-2);
  flex-wrap: wrap;
}

.tag {
  font-family: var(--font-ui);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--tag-color, var(--color-accent));
  background: transparent;
  padding: 2px 0;
}

/* ── Title ── */
.post-card__title {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.35;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 200ms ease;
}

.post-card:hover .post-card__title {
  color: var(--color-accent-hover);
}

/* ── Excerpt ── */
.post-card__excerpt {
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: var(--color-text-secondary);
  line-height: 1.65;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* ── Meta ── */
.post-card__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--sp-3);
  margin-top: auto;
  padding-top: var(--sp-4);
  border-top: 1px solid var(--color-border);
}

.meta-author {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  min-width: 0;
}

.meta-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--color-accent-dim);
  border: 1px solid var(--color-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-accent);
  flex-shrink: 0;
}

.meta-info {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  font-family: var(--font-ui);
  font-size: 0.78rem;
  color: var(--color-text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.meta-name {
  color: var(--color-text);
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
}

.meta-divider {
  color: var(--color-text-muted);
}

.meta-reading {
  font-family: var(--font-ui);
  font-size: 0.75rem;
  color: var(--color-text-muted);
  white-space: nowrap;
  flex-shrink: 0;
}

/* ── CTA ── */
.post-card__cta {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  font-family: var(--font-ui);
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: var(--color-accent);
  opacity: 0;
  transform: translateX(-6px);
  transition: opacity 250ms ease, transform 250ms var(--ease-out-quart);
}

.post-card:hover .post-card__cta {
  opacity: 1;
  transform: translateX(0);
}
</style>
