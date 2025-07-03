import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import {
  Button,
  message,
  DatePicker,
  Form,
  Input,
  Popconfirm,
  Space,
  Table,
  Col,
  Row,
} from "antd";
import {
  getOrganizationTreeDataF,
  getOrganizationTreeLevelDataF,
  deleteOrganizationTreeNodeF,
} from "@/features/organizationTree/api";
import EditTreeNode from "./edit-tree-node/index";
// import { uniqueByProperty } from "../../utils/common";
import "./index.scss";

function OrganizationTreeManage() {
  const containerRef = useRef(null);

  const [form] = Form.useForm();
  const formValue = Form.useWatch([], form);
  const [loading, setLoading] = useState(false);
  const [tableHeight, setTableHeight] = useState(0);
  const [dataHeight, setDataHeight] = useState(0);
  const [dataSource, setDataSource] = useState([]);
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState(null);
  const [firstOrganizationList, setFirstOrganizationList] = useState([]); // 一级组织
  const [secondOrganizationList, setSecondOrganizationList] = useState([]); // 二级组织
  const [thirdOrganizationList, setThirdOrganizationList] = useState([]); // 三级组织

  const onQuery = () => {
    setLoading(true);
    queryOrganizationTreeData({ name: formValue.departmentName });
  };
  const newAddF = () => {
    setFormData(null);
    setVisible(true);
  };

  useEffect(() => {
    queryOrganizationTreeData({ name: null });
    getOrganizationTreeLevelData();
  }, []);

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        const formHeight =
          containerRef.current.querySelector(".ant-form")?.clientHeight || 0;
        const paginationHeight =
          containerRef.current.querySelector(".ant-pagination")?.clientHeight ||
          0;
        const height =
          containerRef.current.clientHeight -
          formHeight -
          paginationHeight -
          54;
        const tableHeadeHeight =
          document.querySelector(".ant-table-header")?.offsetHeight || 0;
        const _dataHeight = tableHeadeHeight * dataSource.length;
        setTableHeight(height);
        setDataHeight(_dataHeight);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [dataSource]);

  const queryOrganizationTreeData = (params) => {
    getOrganizationTreeDataF(params).then(({ code, data, resultMsg }) => {
      setLoading(false);
      if (code === 0) {
        setDataSource(data);
      } else {
        setDataSource([]);
        message.error(resultMsg);
      }
    });
  };
  const getOrganizationTreeLevelData = () => {
    getOrganizationTreeLevelDataF().then(({ code, data, resultMsg }) => {
      if (code === 0) {
        const { firstLevel, secondLevel, thirdLevel } = data;
        setFirstOrganizationList(firstLevel);
        setSecondOrganizationList(secondLevel);
        // setThirdOrganizationList(thirdLevel);
      }
    });
  };

  const columns = [
    {
      title: "序号",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "一级组织",
      dataIndex: "firstOrganizationName",
      key: "firstOrganizationName",
    },
    {
      title: "二级组织",
      dataIndex: "secondOrganizationName",
      key: "secondOrganizationName",
    },
    {
      title: "部门名称",
      dataIndex: "thirdOrganizationName",
      key: "thirdOrganizationName",
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" size="small" onClick={() => editF(record)}>
            编辑
          </Button>
          <Popconfirm
            title="提示"
            description="删除这条数据的操作是不可逆的，是否继续?"
            onConfirm={() => deleteF(record)}
            okText="是"
            cancelText="否"
          >
            <Button type="link" size="small">
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const editF = (val) => {
    setFormData({ ...val });
    setVisible(true);
  };
  const deleteF = (val) => {
    deleteOrganizationTreeNodeF(val.id).then(({ code, resultMsg }) => {
      if (code === 0) {
        message.success(resultMsg);
        onQuery();
      } else {
        message.error(resultMsg);
      }
    });
  };
  const handleSubmit = (values) => {
    setVisible(false);
    onQuery();
  };
  return (
    <div className="organization-tree-manage" ref={containerRef}>
      <Form
        form={form}
        initialValues={{ layout: "inline" }}
        variant={"outlined"}
        onFinish={onQuery}
      >
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item label="部门名称" name="departmentName">
              <Input
                style={{ width: "100%" }}
                placeholder="请输入"
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item className="query-button">
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button
                type="primary"
                onClick={newAddF}
                className="margin-left-12"
              >
                新增
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Table
        dataSource={dataSource}
        columns={columns}
        size="small"
        loading={loading}
        pagination={false}
        sticky
        rowKey="id"
        scroll={{ y: dataHeight > tableHeight ? tableHeight : null }}
        style={{ height: "100%" }}
        className="table__height"
      />
      <EditTreeNode
        key={formData?.id || "create"} // 用于更新组件
        visible={visible}
        onCancel={() => setVisible(false)}
        onFinish={handleSubmit}
        initialValues={formData}
        firstOrganizationList={firstOrganizationList}
        secondOrganizationList={secondOrganizationList}
      ></EditTreeNode>
    </div>
  );
}

export default OrganizationTreeManage;
