import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: 'The Chronicle — Latest Posts' }
  },
  {
    path: '/post/:id',
    name: 'post-detail',
    component: () => import('@/views/PostDetailView.vue'),
    meta: { title: 'Reading — The Chronicle' }
  },
  /**
   * 404 catch-all
   * :pathMatch(.*)*  matches any route not handled above.
   */
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: 'Page Not Found — The Chronicle' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0, behavior: 'smooth' }
  }
})

/* Update document title after each navigation */
router.afterEach((to) => {
  document.title = to.meta?.title ?? 'The Chronicle'
})

export default router
