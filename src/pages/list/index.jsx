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
import {
  getUserInfoF,
  newAddUserF,
  editUserF,
  delUserF,
} from "@/features/auth/api";
import UserInfoModal from "./components/userInfoModal/index";

const { RangePicker } = DatePicker;

function List() {
  const containerRef = useRef(null);
  const [form] = Form.useForm();
  const userName = Form.useWatch("username", form);
  const password = Form.useWatch("password", form);
  const time = Form.useWatch("password", form);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [tableHeight, setTableHeight] = useState(0);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [dataSource, setDataSource] = useState([]);
  const [userInfoModalVisible, setUserInfoModalVisible] = useState(false);
  const [editData, setEditData] = useState(null);

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
          <Button type="link" size="small" onClick={() => editF(record)}>
            编辑
          </Button>
          <Button type="link" size="small" onClick={() => deleteF(record)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];
  const editF = (val) => {
    setEditData(val);
    setUserInfoModalVisible(true);
  };
  const deleteF = (val) => {
    delUserF({ id: val.id }).then(({ code, data, resultMsg }) => {
      if (code === 0) {
        message.success({
          content: resultMsg,
        });
        setLoading(true);
        queryUserInfo();
      } else {
        message.error({
          content: resultMsg,
        });
      }
    });
  };
  const onChange = (page, pageSize) => {
    setPageIndex(page);
    setPageSize(pageSize);
    queryUserInfo(page, pageSize);
  };
  const onQuery = () => {
    setLoading(true);
    setPageIndex(1);
    queryUserInfo();
  };
  const queryUserInfo = (
    currentPage = pageIndex,
    currentPageSize = pageSize
  ) => {
    let startDate, endDate;
    if (time) {
      startDate = dayjs(time[0]).format("YYYY-MM-DD HH:mm:ss");
      endDate = dayjs(time[1]).format("YYYY-MM-DD HH:mm:ss");
    }
    getUserInfoF({
      username: userName,
      password,
      pageSize: currentPageSize,
      pageIndex: currentPage,
      startDate,
      endDate,
    }).then(({ code, data, resultMsg }) => {
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
    });
  };
  const newAddF = () => {
    setEditData(null);
    setUserInfoModalVisible(true);
  };
  const handleModalClose = (val) => {
    if (!val) {
      setUserInfoModalVisible(false);
      return;
    }
    if (!val.id) {
      newAddUserF(val).then(({ code, data, resultMsg }) => {
        if (code === 0) {
          setUserInfoModalVisible(false);
          message.success({
            content: resultMsg,
          });
          setLoading(true);
          queryUserInfo();
        } else {
          message.error({
            content: resultMsg,
          });
        }
      });
    } else {
      editUserF(val).then(({ code, data, resultMsg }) => {
        if (code === 0) {
          setUserInfoModalVisible(false);
          message.success({
            content: resultMsg,
          });
          setLoading(true);
          queryUserInfo();
        } else {
          message.error({
            content: resultMsg,
          });
        }
      });
    }
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
          54;
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
        onFinish={onQuery}
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
        scroll={{ y: tableHeight }}
        style={{ height: "100%" }}
        className="table__height"
      />

      <Pagination
        showQuickJumper
        total={total}
        onChange={onChange}
        pageSizeOptions={[10, 20, 50, 100]}
        className="margin-top-12"
        align="end"
        pageSize={pageSize}
        current={pageIndex}
        showSizeChanger
        showTotal={(total) => `共 ${total} 条`}
      />

      <UserInfoModal
        visible={userInfoModalVisible}
        onClose={handleModalClose}
        initialValues={editData}
      ></UserInfoModal>
    </div>
  );
}

export default List;
