import * as icons from '@ant-design/icons';
import { Link } from "react-router-dom";

export const generateMenuData = (routes, parentPath = '') => {
    return routes
        .filter(route => route.name) // 只有包含 name 的路由才会出现在菜单
        .map(route => {
            const fullPath = route.path.startsWith('/') && !parentPath
                ? route.path // 处理根路由（如 /dashboard）
                : parentPath.endsWith('/')
                    ? `${parentPath}${route.path}` // 避免双斜杠
                    : `${parentPath}/${route.path}`;

            const iconName = route.icon || '';
            const IconComponent = iconName && icons[iconName] ? icons[iconName] : null;
            return {
                key: fullPath,
                name: route.name,
                icon: IconComponent ? <IconComponent /> : null,
                label: route.children ? route.name : <Link to={fullPath}>{route.name}</Link>,
                children: route.children
                    ? generateMenuData(route.children, fullPath)
                    : undefined,
            };
        });
};