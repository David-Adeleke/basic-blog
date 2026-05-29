const BASE_URL = 'https://api.oluwasetemi.dev'

function normalizePost(post) {
  const rawBody =
    post.body ??
    post.content ??
    post.description ??
    ''

  const wordCount = rawBody
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .length

  const excerpt =
    post.excerpt ??
    post.summary ??
    post.shortDescription ??
    (rawBody.length > 260
      ? rawBody
          .slice(0, 260)
          .trim()
          .replace(/\s+\S*$/, '') + '…'
      : rawBody)

  const author =
    typeof post.author === 'object'
      ? post.author?.name ??
        post.author?.username ??
        'Anonymous'
      : post.author ??
        post.authorName ??
        'Anonymous'

  return {
    id: String(post.id ?? post._id ?? ''),
    title: post.title ?? post.heading ?? 'Untitled',

    body: rawBody,

    excerpt,

    createdAt:
      post.createdAt ??
      post.created_at ??
      post.publishedAt ??
      post.date ??
      null,

    updatedAt:
      post.updatedAt ??
      post.updated_at ??
      null,

    author,

    tags: Array.isArray(post.tags)
      ? post.tags
      : [],

    image:
      post.featuredImage ??
      post.image ??
      post.coverImage ??
      post.thumbnail ??
      post.cover ??
      null,

    slug:
      post.slug ??
      String(post.id ?? post._id ?? ''),

    wordCount
  }
}

export async function fetchPosts() {
  const res = await fetch(`${BASE_URL}/posts`, {
    headers: {
      Accept: 'application/json'
    }
  })

  if (!res.ok) {
    throw new Error(
      `Failed to load posts — server returned ${res.status} ${res.statusText}`
    )
  }

  const json = await res.json()

  const raw = Array.isArray(json)
    ? json
    : json.data ??
      json.posts ??
      json.items ??
      json.results ??
      []

  if (!Array.isArray(raw)) {
    throw new Error(
      'Unexpected API response: posts list not found'
    )
  }

  return raw.map(normalizePost)
}

export async function fetchPost(id) {
  const res = await fetch(
    `${BASE_URL}/posts/${id}`,
    {
      headers: {
        Accept: 'application/json'
      }
    }
  )

  if (res.status === 404) {
    throw new Error(
      `Post "${id}" was not found.`
    )
  }

  if (!res.ok) {
    throw new Error(
      `Failed to load post — server returned ${res.status} ${res.statusText}`
    )
  }

  const json = await res.json()

  const raw =
    json.data ??
    json.post ??
    json.item ??
    json

  return normalizePost(raw)
}

export function formatDate(dateStr) {
  if (!dateStr) return 'Unknown date'

  try {
    return new Intl.DateTimeFormat(
      'en-US',
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }
    ).format(new Date(dateStr))
  } catch {
    return dateStr
  }
}

export function readingTime(wordCount) {
  const mins = Math.max(
    1,
    Math.ceil((wordCount || 0) / 200)
  )

  return `${mins} min read`
}
