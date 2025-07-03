import { post, get } from '@/utils/request';

// 获取组织树信息
export function getOrganizationTreeDataF(data) {
    return get('/api/v1/organizationTree/getOrganizationTree', data);
}

// 获取组织层级数据
export function getOrganizationLevelDataF() {
    return get('/api/v1/organizationTree/getLevelData');
}

// 新增组织树信息
export function addOrganizationTreeDataF(data) {
    return post('/api/v1/organizationTree/addTreeNode', data);
}

// 编辑组织树节点信息
export function editOrganizationTreeNode(data) {
    return post('/api/v1/organizationTree/editTreeNode', data);
}

// 删除组织树节点信息
export function deleteOrganizationTreeNodeF(id) {
    return post('/api/v1/organizationTree/deleteTreeNode', { id });
}

// 获取组织树各层级节点数据
export function getOrganizationTreeLevelDataF() {
    return get('/api/v1/organizationTree/getTreeLevelData');
}
