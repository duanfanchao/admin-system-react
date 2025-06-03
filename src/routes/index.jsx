import { lazy } from "react";
import { Navigate } from "react-router-dom";
import BasicLayout from "../layouts/BasicLayout";

const Login = lazy(() => import("../pages/login/index"));
const Dashboard = lazy(() => import("../pages/dashBoard/index"));
const NotFound = lazy(() => import("../pages/exception/404"));

const routes = [
  {
    path: "/",
    element: <BasicLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" /> },
      { path: "dashboard", element: <Dashboard /> },
      // 其他业务路由...
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "*", element: <NotFound /> },
];

export default routes;
