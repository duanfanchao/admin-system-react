import { lazy } from "react";
import { Navigate } from "react-router-dom";
import BasicLayout from "../layouts/BasicLayout";
import PrivateRoute from '../components/privateRoute/index';

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
        ],
      },
    ],
  },

//   { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "*", element: <NotFound /> },
];

export default routes;
