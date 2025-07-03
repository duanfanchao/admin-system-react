import { useEffect, useState, useMemo } from 'react';

/**
 * 自定义hook，用于根据容器高度和排除元素计算表格的可用高度
 * @param {*} data 表格数据
 * @param  {...string} excludeClassNames 排除的元素类名
 * @returns 表格可用高度
 * 
 * 说明：
 * 1. 该hook根据容器高度和排除元素的总高度，计算表格可用的最大高度。
 * 2. 容器高度 = 浏览器窗口高度 - 排除元素的总高度 - 容器内边距 - 容器边框
 * 3. 表格可用高度 = 容器高度 - 表格头部高度（固定） - 表格底部高度（固定）
 * 4. 如果表格主体内容高度小于可用高度，则返回空（不渲染），否则返回可用高度。
 * 5. 表格主体内容高度 = 表格主体元素的总高度（包括滚动条）
 */

const useTableScrollHeight = (data, ...excludeClassNames) => {
    const [tableHeight, setTableHeight] = useState(0);
    // 将excludeClassNames转换为稳定的依赖项
    const excludeClassesKey = useMemo(() => excludeClassNames.join(','), [excludeClassNames]);
    useEffect(() => {
        if (excludeClassNames.length === 0) {
            return;
        }
        // 获取容器元素
        const container = document.querySelector(`.${excludeClassNames[0]}`);
        if (!container) {
            return;
        }
        // 计算所有排除元素的总高度
        let excludedHeight = 0;
        for (let i = 1; i < excludeClassNames.length; i++) {
            const element = document.querySelector(`.${excludeClassNames[i]}`);
            if (element) {
                if (element) {
                    const style = window.getComputedStyle(element);
                    excludedHeight += element.clientHeight +
                        parseFloat(style.marginTop) +
                        parseFloat(style.marginBottom);
                }
            }
        }
        // 额外计算容器内的ant-table-header高度
        const antTableHeader = container.querySelector('.ant-table-header');
        if (antTableHeader) {
            excludedHeight += antTableHeader.clientHeight;
        }

        // 获取容器的内边距和边框宽度
        const paddingAndBorder =
            parseInt(window.getComputedStyle(container).paddingTop) +
            parseInt(window.getComputedStyle(container).paddingBottom) +
            parseInt(window.getComputedStyle(container).borderTopWidth) +
            parseInt(window.getComputedStyle(container).borderBottomWidth);
        // 计算表格可用的高度：容器高度减去所有排除元素的高度和内边距、边框
        const containerHeight = container.clientHeight;
        const availableHeight = containerHeight - excludedHeight - paddingAndBorder;

        // 获取 ant-table-tbody 元素（表格主体部分）
        const antTableBody = container.querySelector('.ant-table-tbody');
        if (antTableBody) {
            const antTableBodyHeight = antTableBody.clientHeight;

            // 如果表格主体的高度小于可用高度，则返回空（不渲染）
            if (antTableBodyHeight < availableHeight) {
                setTableHeight(null);
            } else {
                setTableHeight(availableHeight);
            }
        } else {
            // 如果没有表格主体元素，直接设置为可用高度（最大值为0）
            setTableHeight(Math.max(availableHeight, 0));
        }
    }, [excludeClassNames, excludeClassesKey, data]);
    return tableHeight;
}

export default useTableScrollHeight;