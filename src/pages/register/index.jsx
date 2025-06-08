import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { registerF } from "@/features/auth/api";
import { useNavigate } from "react-router-dom";
import "./index.scss";

function Register() {
  const navigate = useNavigate();
  const onRegister = ({ username, password }) => {
    registerF({ username, password }).then(({ code, data, resultMsg }) => {
      if (code === 0) {
        message.success({
          content: resultMsg,
        });
        navigate("/login");
      }
    });
  };

  return (
    <div className="register">
      <h1>注册</h1>
      <Form className="register-form" onFinish={onRegister}>
        <Form.Item name="username" rules={[{ required: true }]}>
          <Input prefix={<UserOutlined />} placeholder="用户名" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true }]}>
          <Input.Password prefix={<LockOutlined />} placeholder="密码" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block autoInsertSpace>
            确定
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Register;
