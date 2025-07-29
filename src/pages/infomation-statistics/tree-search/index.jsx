import { useState, useEffect } from "react";
import { Input, Tree, message } from "antd";
import { getOrganizationTreeNodeDataF } from "@/features/infomationStatistics/api";
import { formatTreeData } from "@/utils/common";

const { Search } = Input;

function TreeSearch({ props }) {
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [treeData, setTreeData] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const handleSearch = (value) => {
    getgetOrganizationTreeData(value);
  };
  const onExpand = (newExpandedKeys) => {
    setExpandedKeys(newExpandedKeys);
    setSelectedKeys([]);
  };
  const onSelect = (val) => {
    setSelectedKeys(val);
  }
  const getgetOrganizationTreeData = (val) => {
    getOrganizationTreeNodeDataF({ name: val }).then(
      ({ code, data, resultMsg }) => {
        if (code === 0) {
          const res = formatTreeData(data);
          setTreeData(res);
          setExpandedKeys([res[0].key]);
        } else {
          message.error(resultMsg);
        }
      }
    );
  };
  useEffect(() => {
    getgetOrganizationTreeData(null);
  }, []);
  return (
    <div className="tree-search">
      <Search
        style={{ marginBottom: 8 }}
        placeholder="请输入关键字"
        onSearch={handleSearch}
        enterButton
      />
      <Tree
        className="tree-style"
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        treeData={treeData}
        selectedKeys={selectedKeys}
        onSelect={onSelect}
      />
    </div>
  );
}

export default TreeSearch;
