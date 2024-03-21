import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

export * from "./module/user.js";
export * from "./module/globalVariable.js";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export default pinia;
