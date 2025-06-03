import ProLayout from "@ant-design/pro-layout";
import { Link, Outlet, useLocation } from "react-router-dom";

const menuData = [
  {
    path: "/dashboard",
    name: "仪表盘",
    icon: "dashboard",
  },
  {
    path: "/user",
    name: "用户管理",
    icon: "user",
    children: [
      { path: "/user/list", name: "用户列表" },
      { path: "/user/create", name: "新建用户" },
    ],
  },
];

export default function BasicLayout() {
  const location = useLocation();

  return (
    <ProLayout
      title="管理系统"
      logo={null}
      menuDataRender={() => menuData}
      menuItemRender={(item, dom) => <Link to={item.path}>{dom}</Link>}
      location={location}
    >
      <Outlet />
    </ProLayout>
  );
}
