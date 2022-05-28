const routes = [
  {
    path: "/",
    component: () => import("./views/HomeView.js"),
  },
  {
    path: "/about",
    component: () => import("./views/AboutView.js"),
  },
  {
    path: "*",
    component: {
      template: '<div class="py-5 text-center">404 Not Found</div>'
    }
  }
];

export default new VueRouter({
  routes,
});
