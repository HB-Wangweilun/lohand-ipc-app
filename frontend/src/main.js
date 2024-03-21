// Element Plus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import { createApp } from "vue";
import App from "./App.vue";

// Reset Css
import "./assets/css/reset.css";

// Global Css
import "./assets/global.scss";

// Global Component
import components from "./components/global";

// Router
import Router from "./router/index";

// Pinia
import Pinia from "./store";

// Contextmenu
import Contentmenu from "v-contextmenu";
import "v-contextmenu/dist/themes/default.css";

// Animate css
import "animate.css";

const app = createApp(App);
app.config.productionTip = false;

// components
for (const i in components) {
  app.component(i, components[i]);
}

app.use(Router);
app.use(Pinia);
app.use(ElementPlus);
app.use(Contentmenu);
app.mount("#app");
