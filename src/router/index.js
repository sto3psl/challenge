import { createRouter, createWebHistory } from "vue-router";
import AppShell from "../views/AppShell.vue";

window.isAuthorized = false;

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/auth/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/",
      name: "home",
      component: AppShell,
      meta: { requiresAuth: true },
      children: [
        {
          path: "",
          name: "main",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("../views/HomeView.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/:stock",
          name: "stock",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("../views/StockView.vue"),
          meta: { requiresAuth: true },
        },
      ],
    },
  ],
});

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !window.isAuthorized) return "/auth/login";
});

export default router;
