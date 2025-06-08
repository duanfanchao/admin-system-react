import { useState, useEffect, useRef } from "react";
import {
  Button,
  message,
  DatePicker,
  Form,
  Input,
  Pagination,
  Space,
  Table,
  Col,
  Row,
} from "antd";
import "./index.scss";
import dayjs from "../../utils/day";
import { getUserInfoF } from "@/features/auth/api";

const { RangePicker } = DatePicker;

function List() {
  const containerRef = useRef(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(100);
  const [tableHeight, setTableHeight] = useState(0);
  const [dataSource, setDataSource] = useState([]);

  const columns = [
    {
      title: "用户名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "密码",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "日期",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" size="small">
            编辑
          </Button>
          <Button type="link" size="small">
            删除
          </Button>
        </Space>
      ),
    },
  ];
  const onChange = (page, pageSize) => {
    console.log(page, pageSize);
  };
  const onFinish = ({ username, password, time }) => {
    setLoading(true);
    let startDate, endDate;
    if (time) {
      startDate = dayjs(time[0]).format("YYYY-MM-DD HH:mm:ss");
      endDate = dayjs(time[1]).format("YYYY-MM-DD HH:mm:ss");
    }
    getUserInfoF({ username, password, startDate, endDate }).then(
      ({ code, data, resultMsg }) => {
        setLoading(false);
        if (code === 0) {
          setDataSource(data.list);
          setTotal(data.total);
        } else {
          setDataSource([]);
          setTotal(0);
          message.error({
            content: resultMsg,
          });
        }
      }
    );
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

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
          36; // 减去边距
        const tableHeadHeight =
          containerRef.current.querySelector(".ant-table-header")
            ?.clientHeight || 0;
        containerRef.current.querySelector(".ant-empty").style.height =
          height - tableHeadHeight - 82 + "px";
        setTableHeight(height);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);
  return (
    <div className="user-list" ref={containerRef}>
      <Form
        form={form}
        initialValues={{ layout: "inline" }}
        variant={"outlined"}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item label="用户名" name="username">
              <Input
                style={{ width: "100%" }}
                placeholder="请输入"
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="密码" name="password">
              <Input
                style={{ width: "100%" }}
                placeholder="请输入"
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="日期范围" name="time">
              <RangePicker
                placeholder="请选择"
                format={"YYYY-MM-DD HH:mm:ss"}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item className="query-button">
              <Button type="primary" htmlType="submit">
                查询
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Table
        dataSource={dataSource}
        columns={columns}
        size="small"
        bordered
        loading={loading}
        pagination={false}
        sticky
        rowKey="id"
        style={{ height: tableHeight }}
        scroll={{ y: tableHeight }}
      />

      <Pagination
        showQuickJumper
        total={total}
        onChange={onChange}
        pageSizeOptions={[10, 20, 50, 100]}
        className="margin-top-12"
        align="end"
      />
    </div>
  );
}

export default List;
