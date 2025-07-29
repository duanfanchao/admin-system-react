function uniqueByProperty(arr, prop) {
    const map = new Map();
    arr.forEach(item => {
        if (!map.has(item[prop])) {
            map.set(item[prop], item);
        }
    });
    return Array.from(map.values());
}

function formatTreeData(nodes, options = {}) {
    const {
        idKey = 'id',
        nameKey = 'name',
        parentKey = 'parentId',
        childrenKey = 'children',
        rootId = null
    } = options;

    // 创建节点映射表
    const nodeMap = new Map();
    const tree = [];

    // 第一遍遍历：初始化所有节点
    nodes.forEach(node => {
        nodeMap.set(node[idKey], {
            ...node,
            key: node[idKey],       // 添加key字段，值为id
            title: node[nameKey],   // 添加title字段，值为name
            [childrenKey]: []      // 初始化children数组
        });
    });

    // 第二遍遍历：构建树结构
    nodes.forEach(node => {
        const currentNode = nodeMap.get(node[idKey]);
        const parentId = node[parentKey];

        if (parentId === rootId || parentId === null) {
            // 根节点
            tree.push(currentNode);
        } else if (nodeMap.has(parentId)) {
            // 找到父节点并添加到其children数组
            const parentNode = nodeMap.get(parentId);
            parentNode[childrenKey].push(currentNode);
        } else {
            // 处理孤儿节点（可选：可以忽略或作为根节点）
            tree.push(currentNode);
        }
    });

    return tree;
}

export {
    uniqueByProperty,
    formatTreeData,
}