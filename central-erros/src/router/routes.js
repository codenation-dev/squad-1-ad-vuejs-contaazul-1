import Vue from "vue";
import Router from "vue-router";

import Login from "@/views/Login";
import Register from "@/views/Register";
import ChangePassword from "@/views/ChangePassword";
import Logs from "@/views/Logs";
import Erro from "@/views/Erro";

Vue.use(Router);

const routes = [
  {
    name: "login",
    path: "/",
    component: Login,
  },

  {
    name: "register",
    path: "/register",
    component: Register,
  },

  {
    name: "change-password",
    path: "/change_password",
    component: ChangePassword,
  },

  {
    name: "logs",
    path: "/logs",
    component: Logs,
  },

  {
    name: "erro",
    path: "/erro",
    component: Erro,
  },
];

const router = new Router({ routes });

export default router;
