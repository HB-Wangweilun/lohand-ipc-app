/**
 * 基础路由
 * @type { *[] }
 */

const constantRouterMap = [
  {
    path: "/",
    redirect: "/loading",
  },
  {
    path: "/loading",
    name: "Loading",
    component: () => import("../views/loading/index.vue"),
  },
  {
    path: "/layout",
    name: "Layout",
    component: () => import("../layout/index.vue"),
    children: [
      {
        path: "/home",
        name: "Home",
        component: () => import("../views/home/index.vue"),
        meta: {
          title: "首页",
          isModulePage: false,
        },
      },
      {
        path: "/login",
        name: "Login",
        component: () => import("../views/login/index.vue"),
        meta: {
          title: "登录页",
          isModulePage: false,
        },
      },
      // 仪表管理
      {
        path: "/meterManagement",
        name: "MeterManagement",
        component: () => import("../views/meterManagement/index.vue"),
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
        component: () => import("../views/paramSetting/index.vue"),
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
        component: () => import("../views/systemSetting/index.vue"),
        meta: {
          title: "系统设置",
          isModulePage: true,
          icon: "systemSetting",
          backgroundColor: "#0b9bda",
        },
      },
      // 数据查询
      {
        path: "/selectData",
        name: "SelectData",
        component: () => import("../views/selectData/index.vue"),
        meta: {
          title: "数据查询",
          isModulePage: true,
          icon: "selectData",
          backgroundColor: "#CC6600",
        },
      },
      // 日志管理
      {
        path: "/logManagement",
        name: "LogManagement",
        component: () => import("../views/logManagement/index.vue"),
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
        component: () => import("../views/operationManagement/index.vue"),
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
        component: () => import("../views/moreFunction/index.vue"),
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
        component: () => import("../views/xxxManagement/index.vue"),
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
