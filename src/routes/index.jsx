import { lazy } from "react";
import { Navigate } from "react-router-dom";
import BasicLayout from "../layouts/BasicLayout";
import PrivateRoute from "../components/privateRoute/index";

const Login = lazy(() =>
  import(/* webpackPrefetch: true */ "../pages/login/index")
);
const Dashboard = lazy(() =>
  import(/* webpackPrefetch: true */ "../pages/dashBoard/index")
);
const NotFound = lazy(() =>
  import(/* webpackPrefetch: true */ "../pages/exception/404")
);
const Register = lazy(() =>
  import(/* webpackPrefetch: true */ "../pages/register/index")
);
const UserList = lazy(() =>
  import(/* webpackPrefetch: true */ "../pages/list/index")
);
const UserAction = lazy(() =>
  import(/* webpackPrefetch: true */ "../pages/userAction/index")
);
const Mechanism = lazy(() =>
  import(/* webpackPrefetch: true */ "../pages/mechanism/index")
);
const PageRefresh = lazy(() =>
  import(/* webpackPrefetch: true */ "../pages/page-refresh/index")
);
const PerformanceOptimization = lazy(() =>
  import(/* webpackPrefetch: true */ "../pages/performance-optimization/index")
);
const CustomHook = lazy(() =>
  import(/* webpackPrefetch: true */ "../pages/custom-hook/index")
);
const DevelopmentStandard = lazy(() =>
  import(/* webpackPrefetch: true */ "../pages/development-standard/index")
);
const OrganizationTreeManage = lazy(() =>
  import(/* webpackPrefetch: true */ "../pages/organization-tree-manage/index")
);
const TestTableHeight = lazy(() =>
  import(/* webpackPrefetch: true */ "../pages/test-table-height/index")
);
const DataBoard = lazy(() =>
  import(/* webpackPrefetch: true */ "../pages/data-board/index")
);

const routes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: "/",
        element: <BasicLayout />,
        children: [
          { index: true, element: <Navigate to="/dashboard" /> },
          {
            path: "dashboard",
            element: <Dashboard />,
            name: "首页",
            icon: "AppstoreOutlined",
          },
          {
            path: "user",
            name: "用户管理",
            icon: "MailOutlined",
            children: [
              {
                name: "用户列表",
                icon: "AlignCenterOutlined",
                path: "list",
                element: <UserList />,
              },
              {
                name: "用户操作",
                icon: "LineChartOutlined",
                path: "action",
                element: <UserAction />,
              },
            ],
          },
          {
            path: "organizationTreeManage",
            element: <OrganizationTreeManage />,
            name: "组织架构管理",
            icon: "LineChartOutlined",
          },
          {
            path: "dataBoard",
            element: <DataBoard />,
            name: "数据面板",
            icon: "LineChartOutlined",
          },
          {
            path: "mechanism",
            element: <Mechanism />,
            name: "脱围机制",
            icon: "BoxPlotOutlined",
          },
          {
            path: "pageRefresh",
            element: <PageRefresh />,
            name: "页面重新渲染",
            icon: "ContainerOutlined",
          },
          {
            path: "performanceOptimization",
            element: <PerformanceOptimization />,
            name: "性能优化",
            icon: "DashboardOutlined",
          },
          {
            path: "customHook",
            element: <CustomHook />,
            name: "自定义hook",
            icon: "DashboardOutlined",
          },
          {
            path: "developmentStandard",
            element: <DevelopmentStandard />,
            name: "开发规范",
            icon: "DashboardOutlined",
          },
          {
            path: "testTableHeight",
            element: <TestTableHeight />,
            name: "测试表格高度",
            icon: "DashboardOutlined",
          },
        ],
      },
    ],
  },

  //   { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "*", element: <NotFound /> },
];

export default routes;
