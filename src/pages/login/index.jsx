import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";

export default function Login() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  return (
    <div style={{ width: 360, margin: "100px auto" }}>
      <Form onFinish={onFinish}>
        <Form.Item name="username" rules={[{ required: true }]}>
          <Input prefix={<UserOutlined />} placeholder="用户名" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true }]}>
          <Input.Password prefix={<LockOutlined />} placeholder="密码" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
