/**
 * 基础路由
 * @type { *[] }
 */

import Layout from "../layout/index.vue";
import Loading from "../views/loading/index.vue";
import Home from "../views/home/index.vue";
import Login from "../views/login/index.vue";
import MeterManagement from "../views/meterManagement/index.vue";
import ParamSetting from "../views/paramSetting/index.vue";
import SystemSetting from "../views/systemSetting/index.vue";
import SelectData from "../views/historicalData/index.vue";
import LogManagement from "../views/logManagement/index.vue";
import OperationManagement from "../views/operationManagement/index.vue";
import MoreFunction from "../views/moreFunction/index.vue";
import XxxManagement from "../views/xxxManagement/index.vue";

const constantRouterMap = [
  {
    path: "/",
    redirect: "/loading",
  },
  {
    path: "/loading",
    name: "Loading",
    // component: () => import("../views/loading/index.vue"),
    component: Loading,
  },
  {
    path: "/layout",
    name: "Layout",
    // component: () => import("../layout/index.vue"),
    component: Layout,
    children: [
      {
        path: "/home",
        name: "Home",
        // component: () => import("../views/home/index.vue"),
        component: Home,
        meta: {
          title: "首页",
          isModulePage: false,
        },
      },
      {
        path: "/login",
        name: "Login",
        component: Login,
        // component: () => import("../views/login/index.vue"),
        meta: {
          title: "登录页",
          isModulePage: false,
        },
      },
      // 仪表管理
      {
        path: "/meterManagement",
        name: "MeterManagement",
        // component: () => import("../views/meterManagement/index.vue"),
        component: MeterManagement,
        meta: {
          title: "仪表管理",
          isModulePage: true,
          icon: "meterManagement",
          backgroundColor: "#026bda",
        },
      },
      // 参数设置
      {
        path: "/paramSetting",
        name: "ParamSetting",
        // component: () => import("../views/paramSetting/index.vue"),
        component: ParamSetting,
        meta: {
          title: "参数设置",
          isModulePage: true,
          icon: "paramSetting",
          backgroundColor: "rgb(53, 169, 136)",
        },
      },
      // 系统设置
      {
        path: "/systemSetting",
        name: "SystemSetting",
        // component: () => import("../views/systemSetting/index.vue"),
        component: SystemSetting,
        meta: {
          title: "系统设置",
          isModulePage: true,
          icon: "systemSetting",
          backgroundColor: "#0b9bda",
        },
      },
      // 数据查询
      {
        path: "/historicalData",
        name: "HistoricalData",
        // component: () => import("../views/selectData/index.vue"),
        component: SelectData,
        meta: {
          title: "历史数据",
          isModulePage: true,
          icon: "historicalData",
          backgroundColor: "#CC6600",
        },
      },
      // 日志管理
      {
        path: "/logManagement",
        name: "LogManagement",
        // component: () => import("../views/logManagement/index.vue"),
        component: LogManagement,
        meta: {
          title: "日志管理",
          isModulePage: true,
          icon: "logManagement",
          backgroundColor: "rgba(138, 80, 213,1)",
        },
      },
      // 运维管理
      {
        path: "/operationManagement",
        name: "OperationManagement",
        // component: () => import("../views/operationManagement/index.vue"),
        component: OperationManagement,
        meta: {
          title: "运维管理",
          isModulePage: true,
          icon: "operationManagement",
          backgroundColor: "#3588A3",
        },
      },
      // 更多功能
      {
        path: "/moreFunction",
        name: "MoreFunction",
        // component: () => import("../views/moreFunction/index.vue"),
        component: MoreFunction,
        meta: {
          title: "更多功能",
          isModulePage: true,
          icon: "moreFunction",
          backgroundColor: "#6666CC",
        },
      },
      // xxx
      {
        path: "/xxxManagement",
        name: "XxxManagement",
        // component: () => import("../views/xxxManagement/index.vue"),
        component: XxxManagement,
        meta: {
          title: "退出系统",
          isModulePage: true,
          icon: "logOut",
          backgroundColor: "#8b8b8b",
        },
      },

      {
        path: "/example",
        name: "Example",
        redirect: { name: "ExampleHelloIndex" },
        children: [
          {
            path: "/example",
            name: "ExampleHelloIndex",
            component: () => import("@/views/example/hello/Index.vue"),
          },
        ],
        meta: {
          title: "模板页",
        },
      },
    ],
  },
];

export default constantRouterMap;
