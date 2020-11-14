import Vue from "vue";
import VueRouter from "vue-router";
import SignIn from "@/features/Authentication/SignIn";
import SignUp from "@/features/Authentication/SignUp";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/users/signin"
  },
  {
    path: "/users/signup",
    name: "SignUp",
    component: SignUp
  },
  {
    path: "/users/signin",
    name: "SignIn",
    component: SignIn
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
