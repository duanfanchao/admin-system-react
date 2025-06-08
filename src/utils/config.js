const systemId = "highway-toll";
const getSystemId = function () {
    return systemId
}

const getBreadcrumbPath = function (data, targetKey) {
    const result = [];

    function findPath(items, currentPath = []) {
        for (const item of items) {
            const newPath = [...currentPath, { title: item.name, key: item.key }];

            // 如果找到匹配的项
            if (item.key === targetKey) {
                result.push(...newPath);
                return true;
            }

            // 如果有子项，递归查找
            if (item.children) {
                if (findPath(item.children, newPath)) {
                    return true;
                }
            }
        }
        return false;
    }

    findPath(data);
    return result;

}

export { getSystemId, getBreadcrumbPath };