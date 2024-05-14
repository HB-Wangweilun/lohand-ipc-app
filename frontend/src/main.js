// Element Plus
import ElementPlus from "element-plus"
import zhCn from "element-plus/es/locale/lang/zh-cn"
import "element-plus/dist/index.css"

// Vant
import { FloatingBubble } from "vant"
import "vant/lib/index.css"

import "./assets/font/font.css"

import { createApp } from "vue"
import App from "./App.vue"

// Reset Css
import "./assets/css/reset.css"

// Global Css
import "./assets/global.scss"

// Global Component
import components from "./components/global"

// Router
import Router from "./router/index"

// Pinia
import Pinia from "./store"

// Contextmenu
import Contentmenu from "v-contextmenu"
import "v-contextmenu/dist/themes/default.css"

// Animate css
import "animate.css"

// JsonEditorVue
import JsonEditorVue from "json-editor-vue3"
import "jsoneditor"

const app = createApp(App)
app.config.productionTip = false

// 屏蔽黄色警告信息
app.config.warnHandler = (e, data) => {
  console.log(e, data)
}

// components
for (const i in components) {
  app.component(i, components[i])
}

// 异步加载字体文件
// function loadFonts() {
//   const fontStyles = document.createElement("link")
//   fontStyles.href = "./assets/font.css"
//   fontStyles.rel = "stylesheet"
//   document.head.appendChild(fontStyles)
//   console.log(document.head)
// }

app.use(Router)
app.use(Pinia)
app.use(ElementPlus, {
  locale: zhCn
})
app.use(Contentmenu)
app.use(JsonEditorVue)

// vant悬浮按钮组件注册
app.use(FloatingBubble)

app.mixin({
  beforeMount() {
    // loadFonts()
  }
})
app.mount("#app")
