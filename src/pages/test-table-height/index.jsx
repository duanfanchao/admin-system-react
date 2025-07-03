import { useState } from "react";
import { Table } from "antd";
import useTableScrollHeight from '../../hooks/useTableScrollHeight';
import "./index.scss";

function TestTableHeight({ props }) {
  const [state, setstate] = useState();
  const dataSource = [
    {
      key: "1",
      name: "胡彦斌",
      age: 32,
      address: "西湖区湖底公园1号",
    },
    {
      key: "2",
      name: "胡彦祖",
      age: 42,
      address: "西湖区湖底公园2号",
    },
    {
      key: "3",
      name: "李大嘴",
      age: 32,
      address: "西湖区湖底公园1号",
    },
    {
      key: "4",
      name: "李大嘴",
      age: 32,
      address: "西湖区湖底公园1号",
    },
    {
      key: "5",
      name: "李大嘴",
      age: 32,
      address: "西湖区湖底公园1号",
    },
    {
      key: "6",
      name: "李大嘴",
      age: 32,
      address: "西湖区湖底公园1号",
    },
    {
      key: "7",
      name: "李大嘴",
      age: 32,
      address: "西湖区湖底公园1号",
    },
    {
      key: "8",
      name: "李大嘴",
      age: 32,
      address: "西湖区湖底公园1号",
    },
    {
      key: "9",
      name: "李大嘴",
      age: 32,
      address: "西湖区湖底公园1号",
    },
    {
      key: "10",
      name: "李大嘴",
      age: 32,
      address: "西湖区湖底公园1号",
    },
    {
      key: "11",
      name: "李大嘴",
      age: 32,
      address: "西湖区湖底公园1号",
    },
    {
      key: "12",
      name: "李大嘴",
      age: 32,
      address: "西湖区湖底公园1号",
    },
  ];
  const columns = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "住址",
      dataIndex: "address",
      key: "address",
    },
  ];
  const tableHeight = useTableScrollHeight(dataSource, 'test-table-height', 'header', 'footer');

  return (
    <div className="test-table-height">
      <div className="header"></div>
      <div className="table">
        <Table dataSource={dataSource} columns={columns} pagination={false} scroll={{ y: tableHeight }} />
      </div>
      <div className="footer"></div>
    </div>
  );
}

export default TestTableHeight;
