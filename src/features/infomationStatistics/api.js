import { post, get } from '@/utils/request';

// 获取组织树节点数据
export function getOrganizationTreeNodeDataF(data) {
    return get('/api/v1/infomationStatistics/getTreeNodeData', data);
}