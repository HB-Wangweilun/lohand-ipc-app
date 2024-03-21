import { createRouter, createWebHashHistory } from "vue-router";
import routerMap from "./routerMap";
import { useGlobalVariableStore } from "../store";

const Router = createRouter({
  history: createWebHashHistory(),
  routes: routerMap,
});

Router.beforeEach((to, from, next) => {
  const globalVariableStore = useGlobalVariableStore();
  console.log(
    `去到的路由path是--${to.path},去到的路由title是--${to.meta.title}`
  );
  globalVariableStore.navTitle = to.meta.title;
  if (to.path == "/home") {
    globalVariableStore.isHome = true;
  } else {
    globalVariableStore.isHome = false;
  }
  next();
});

export default Router;
