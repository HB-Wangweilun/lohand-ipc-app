import { createPinia } from "pinia"
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"

export * from "./module/user.js"
export * from "./module/globalVariable.js"
export * from "./module/jsonEditor.js"
export * from "./module/reportedData.js"
export * from "./module/paramHistoricalData.js"

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia
