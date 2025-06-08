import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { getToken } from "../../utils/auth";

const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!getToken();
  });
  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!getToken());
    };

    // 监听storage事件
    window.addEventListener("storage", handleStorageChange);

    // 自定义事件监听（同页面内触发）
    const authListener = () => handleStorageChange();
    document.addEventListener("authChange", authListener);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      document.removeEventListener("authChange", authListener);
    };
  }, []);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
