import logo from "@/assets/logo.svg";
import { generateMenuData } from "@/utils/generateMenuData";
import routes from "@/routes/index";
import { useState, useEffect, useMemo } from "react";
import { Layout, Menu, Breadcrumb, theme, Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { getBreadcrumbPath } from "@/utils/config";
import { clearToken } from "../utils/auth";
import "./basicLayout.scss";

const { Header, Content, Sider } = Layout;

export default function BasicLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [openKeys, setOpenKeys] = useState([]);
  const [breadcrumbItems, setBreadcrumbItems] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // 从路由配置生成菜单项
  const menuItems = generateMenuData(routes[1].children[0].children);

  // 退出登录
  const handleLogout = () => {
    clearToken();
    // 手动触发事件，通知 PrivateRoute 重新检查
    document.dispatchEvent(new Event("authChange"));
  };

  // 初始化选中状态
  useEffect(() => {
    const currentPath = location.pathname;
    setSelectedKeys([currentPath]);

    // 设置面包屑
    setBreadcrumbItems(getBreadcrumbPath(menuItems, currentPath));

    // 自动展开当前菜单的父级菜单
    const paths = currentPath.split("/").filter(Boolean);
    if (paths.length > 1) {
      setOpenKeys([`/${paths[0]}`]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // 处理菜单展开/折叠
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => !openKeys.includes(key));
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };

  return (
    <Layout style={{ minHeight: "100%" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="logo_div">
          <img src={logo} alt="" className="login_img" />
          {collapsed ? "" : "reactSystem"}
        </div>
        <Menu
          theme="dark"
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          mode="inline"
          items={menuItems}
          onOpenChange={onOpenChange}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Button
            type="text"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            style={{ marginRight: 16 }}
          >
            退出登录
          </Button>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }} items={breadcrumbItems} />
          <div
            className="content_div"
            style={{
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
