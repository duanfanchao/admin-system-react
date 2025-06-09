import React, { useState, useEffect } from "react";
import { Form, Modal, Input } from "antd";
import {
  checkPassword,
  validateNewPassword,
  validateConfirmPassword,
} from "../../../../utils/formValidate";
import "./index.scss";

function UserInfoModal({ visible, onClose, initialValues }) {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const onOk = async () => {
    try {
      setConfirmLoading(true);
      // 验证表单
      const values = await form.validateFields();
      onClose(
        initialValues
          ? { ...values, id: initialValues.id, password: values.newPassword }
          : values
      );
    } catch (error) {
      console.log("验证失败:", error);
    } finally {
      setConfirmLoading(false);
    }
  };
  const onCancel = () => onClose();

  useEffect(() => {
    if (visible) {
      initialValues
        ? form.setFieldsValue({
            ...initialValues,
            username: initialValues.name,
          })
        : form.resetFields();
    }
  }, [visible, initialValues, form]);

  const renderPasswordFields = () => {
    if (!initialValues) {
      return (
        <Form.Item
          label="密码"
          name="password"
          validateTrigger={["onBlur"]}
          rules={[{ required: true, validator: checkPassword }]}
        >
          <Input.Password
            style={{ width: "100%" }}
            placeholder="请输入"
            allowClear
          />
        </Form.Item>
      );
    }
    return (
      <>
        <Form.Item
          label="原始密码"
          name="password"
          validateTrigger={["onBlur"]}
        >
          <Input style={{ width: "100%" }} disabled />
        </Form.Item>
        <Form.Item
          label="新密码"
          name="newPassword"
          validateTrigger={["onBlur"]}
          dependencies={["password"]}
          rules={[{ required: true }, validateNewPassword]}
        >
          <Input.Password
            style={{ width: "100%" }}
            placeholder="请输入新密码"
            allowClear
          />
        </Form.Item>
        <Form.Item
          label="确认密码"
          name="confirmPassword"
          validateTrigger={["onBlur"]}
          dependencies={["newPassword"]}
          rules={[{ required: true }, validateConfirmPassword]}
        >
          <Input.Password
            style={{ width: "100%" }}
            placeholder="请确认新密码"
            allowClear
          />
        </Form.Item>
      </>
    );
  };
  return (
    <Modal
      title="用户信息"
      closable={{ "aria-label": "Custom Close Button" }}
      open={visible}
      onOk={onOk}
      onCancel={onCancel}
      width={600}
      maskClosable={false}
      confirmLoading={confirmLoading}
    >
      <Form
        form={form}
        variant={"outlined"}
        className="user-list-form"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          label="用户名"
          name="username"
          validateTrigger={["onBlur"]}
          rules={[{ required: true, message: "请输入用户名!" }]}
        >
          <Input style={{ width: "100%" }} placeholder="请输入" allowClear />
        </Form.Item>
        {renderPasswordFields()}
      </Form>
    </Modal>
  );
}

export default UserInfoModal;
