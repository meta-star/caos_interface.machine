import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/lena",
    component: () => import("../views/LenaView.vue"),
  },
  {
    path: "/menu",
    component: () => import("../views/MenuView.vue"),
  },
  {
    path: "/automate",
    component: () => import("../views/AutomateView.vue"),
  },
  {
    path: "/automate/pair",
    component: () => import("../views/AutomatePairView.vue"),
  },
  {
    path: "/automate/:id",
    component: () => import("../views/AutomateDeviceView.vue"),
  },
  {
    path: "/about",
    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("../views/NotFoundView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: (to, _, savedPosition) => {
    if (to.hash) return { selector: to.hash };
    if (savedPosition) return savedPosition;

    return { x: 0, y: 0 };
  },
  routes,
});

export default router;
