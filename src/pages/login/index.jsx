import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { loginF } from "@/features/login/api";
import { setToken } from "@/utils/auth";
import "./index.scss";

export default function Login() {
  const onFinish = ({ username, password }) => {
    loginF({ username, password }).then(({ code, data, resultMsg }) => {
      if (code === 0) {
        setToken(data);
        message.success({
          content: resultMsg,
        });
      }
    });
  };
  const onRegister = () => {
    console.log("注册");
  };
  return (
    <div className="login">
      <h1>登录</h1>
      <Form onFinish={onFinish} className="login-form">
        <Form.Item name="username" rules={[{ required: true }]}>
          <Input prefix={<UserOutlined />} placeholder="用户名" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true }]}>
          <Input.Password prefix={<LockOutlined />} placeholder="密码" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block autoInsertSpace>
            登录
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={onRegister} block autoInsertSpace>
            注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
