const routes = [
  {
    path: "/",
    component: () => import("./views/IndexView.js"),
  },
  {
    path: "/hie",
    component: () => import("./views/HieView.js"),
  },
  {
    path: "/menu",
    component: () => import("./views/MenuView.js"),
  },
  {
    path: "/automate",
    component: () => import("./views/AutomateView.js"),
  },
  {
    path: "/automate/pair",
    component: () => import("./views/AutomatePairView.js"),
  },
  {
    path: "/automate/:id",
    component: () => import("./views/AutomateDeviceView.js"),
  },
  {
    path: "/about",
    component: () => import("./views/AboutView.js"),
  },
  {
    path: "*",
    component: {
      template: '<div class="py-5 text-center">404 Not Found</div>',
    },
  },
];

export default new VueRouter({
  routes,
});
