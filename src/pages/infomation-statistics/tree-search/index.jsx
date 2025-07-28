import { useState, useEffect } from "react";
import { Input, Tree, message } from "antd";
import {
  getOrganizationTreeDataF,
  getOrganizationTreeLevelDataF,
  deleteOrganizationTreeNodeF,
} from "@/features/organizationTree/api";
const { Search } = Input;

function TreeSearch({ props }) {
  const [expandedKeys, setExpandedKeys] = useState(["0"]);
  const [searchValue, setSearchValue] = useState("");
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [treeData, setTreeData] = useState([
    {
      title: "集团",
      key: "0",
      children: [
        {
          title: "华东软件研发中心",
          key: "1",
        },
        {
          title: "华南软件研发中心",
          key: "2",
        },
        {
          title: "华北软件研发中心",
          key: "3",
        },
        {
          title: "华西软件研发中心",
          key: "4",
        },
        {
          title: "华东软件研发中心",
          key: "5",
        },
        {
          title: "华南软件研发中心",
          key: "6",
        },
        {
          title: "华北软件研发中心",
          key: "7",
        },
        {
          title: "华西软件研发中心",
          key: "8",
        },
        {
          title: "华东软件研发中心",
          key: "9",
        },
        {
          title: "华南软件研发中心",
          key: "10",
        },
        {
          title: "华北软件研发中心",
          key: "11",
        },
        {
          title: "华西软件研发中心",
          key: "12",
        },
        {
          title: "华东软件研发中心",
          key: "13",
        },
        {
          title: "华南软件研发中心",
          key: "14",
        },
        {
          title: "华北软件研发中心",
          key: "15",
        },
        {
          title: "华西软件研发中心",
          key: "16",
        },
        {
          title: "华东软件研发中心",
          key: "17",
        },
        {
          title: "华南软件研发中心",
          key: "18",
        },
        {
          title: "华北软件研发中心",
          key: "19",
        },
        {
          title: "华西软件研发中心",
          key: "20",
        },
        {
          title: "华东软件研发中心",
          key: "21",
        },
        {
          title: "华南软件研发中心",
          key: "22",
        },
        {
          title: "华北软件研发中心",
          key: "23",
        },
        {
          title: "华西软件研发中心",
          key: "24",
        },
        {
          title: "华东软件研发中心",
          key: "25",
        },
        {
          title: "华南软件研发中心",
          key: "26",
        },
        {
          title: "华北软件研发中心",
          key: "27",
        },
        {
          title: "华西软件研发中心",
          key: "28",
        },
      ],
    },
  ]);
  const onChange = (e) => {
    const { value } = e.target;
    console.log("onChange", value);
  };
  const onExpand = (newExpandedKeys) => {
    console.log("===onExpand===", newExpandedKeys);
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };
  const getgetOrganizationTreeData = (val) => {
    getOrganizationTreeDataF({ name: val }).then(
      ({ code, data, resultMsg }) => {
        if (code === 0) {
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
        placeholder="请输入"
        onChange={onChange}
      />
      <Tree
        className="tree-style"
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        treeData={treeData}
      />
    </div>
  );
}

export default TreeSearch;
