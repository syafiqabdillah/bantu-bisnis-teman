import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Home/Home.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Register.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/ProfilePage/Profile.vue"),
  },
  {
    path: "/store/:id",
    name: "Store",
    component: () => import("../views/Store/Store.vue"),
  },
  {
    path: "/bukan-admin",
    name: "Admin",
    component: () => import("../views/Admin/Admin.vue"),
  },
  {
    path: "/saran",
    name: "Saran",
    component: () => import("../views/Saran/Saran.vue"),
  },
  {
    path: "*",
    redirect: "/"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
