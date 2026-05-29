<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchPost, formatDate, readingTime } from '@/services/api.js'

const route = useRoute()
const router = useRouter()

const post = await fetchPost(route.params.id)

const formattedDate = computed(() => {
  return post?.createdAt
    ? formatDate(post.createdAt)
    : 'Unknown date'
})

const timeToRead = computed(() => {
  const content = post?.content || ''
  return readingTime(content)
})

const paragraphs = computed(() => {
  return (post?.content || '')
    .split(/\n\n+/)
    .map(p => p.trim())
    .filter(Boolean)
})

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

      <nav class="detail-nav reveal-up">
        <button
          class="back-btn"
          @click="goBack"
          aria-label="Go back"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M10 3L5 8l5 5"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Back
        </button>

        <RouterLink to="/" class="home-crumb">
          The Chronicle
        </RouterLink>
      </nav>

      <header class="detail-header reveal-up reveal-delay-1">

        <div
          v-if="post?.tags?.length"
          class="detail-tags"
        >
          <span
            v-for="tag in post.tags"
            :key="tag"
            class="detail-tag"
          >
            {{ tag }}
          </span>
        </div>

        <h1 class="detail-title">
          {{ post?.title || 'Untitled Post' }}
        </h1>

        <div class="detail-meta">
          <div class="meta-author-block">

            <div class="meta-avatar-lg">
              {{
                (post?.author || 'A')
                  .charAt(0)
                  .toUpperCase()
              }}
            </div>

            <div>
              <div class="meta-author-name">
                {{ post?.author || 'Anonymous' }}
              </div>

              <div class="meta-secondary">
                <time :datetime="post?.createdAt || ''">
                  {{ formattedDate }}
                </time>

                <span class="meta-sep">·</span>

                <span>
                  {{ timeToRead }}
                </span>
              </div>
            </div>

          </div>
        </div>

        <div
          v-if="post?.featuredImage"
          class="detail-cover reveal-up reveal-delay-2"
        >
          <img
            :src="post.featuredImage"
            :alt="post.title"
          />
        </div>

      </header>

      <div
        class="detail-divider reveal-up reveal-delay-2"
        aria-hidden="true"
      >
        <span></span>
        <span class="div-gem">◆</span>
        <span></span>
      </div>

      <div class="detail-body reveal-up reveal-delay-3">

        <template v-if="paragraphs.length">
          <p
            v-for="(para, i) in paragraphs"
            :key="i"
            class="body-para"
            :class="{ 'para--lead': i === 0 }"
          >
            {{ para }}
          </p>
        </template>

        <p v-else class="body-empty">
          No content available for this post.
        </p>

      </div>

      <footer class="detail-footer reveal-up reveal-delay-4">
        <div
          class="footer-divider"
          aria-hidden="true"
        ></div>

        <div class="footer-actions">

          <button
            class="btn-back"
            @click="goBack"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M9 2L4 7l5 5"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Previous page
          </button>

          <RouterLink
            to="/"
            class="btn-home"
          >
            All posts

            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M1 7h12M8 2l5 5-5 5"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
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
}

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
  padding: 3px 10px;
  border-radius: 99px;
}

.detail-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3.2rem);
  font-weight: 800;
  line-height: 1.15;
  color: var(--color-text);
  margin-bottom: var(--sp-8);
}

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
}

.detail-cover {
  margin-top: var(--sp-8);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.detail-cover img {
  width: 100%;
  max-height: 420px;
  object-fit: cover;
}

.detail-body {
  font-family: var(--font-body);
  font-size: 1.15rem;
  line-height: 1.85;
}

.body-para {
  margin-bottom: var(--sp-6);
}

.para--lead {
  font-style: italic;
}

.footer-actions {
  display: flex;
  justify-content: space-between;
  gap: var(--sp-4);
  flex-wrap: wrap;
}
</style>
