import React, { useState, useEffect } from "react";
import { Form, Modal, Input, Select } from "antd";
import {
  checkPassword,
  validateNewPassword,
  validateConfirmPassword,
} from "../../../../utils/formValidate";
import { getOrganizationTreeLevelDataF } from "@/features/organizationTree/api";
import "./index.scss";

function UserInfoModal({ visible, onClose, initialValues }) {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [departmentData, setDepartmentData] = useState([]);
  const getDepartmentData = () => {
    getOrganizationTreeLevelDataF().then(({ code, data, resultMsg }) => {
      if (code === 0) {
        const { thirdLevel } = data;
        setDepartmentData(thirdLevel);
      }
    });
  };
  const onOk = async () => {
    try {
      setConfirmLoading(true);
      // 验证表单
      const values = await form.validateFields();
      const departmentInfo = departmentData.find(
        (ele) => ele.id === values.departmentId
      );
      onClose(
        initialValues
          ? {
              ...values,
              id: initialValues.id,
              password: values.newPassword,
              departmentName: departmentInfo.name,
            }
          : { ...values, departmentName: departmentInfo.name }
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
      getDepartmentData();
      initialValues
        ? form.setFieldsValue({
            ...initialValues,
            username: initialValues.name,
            newPassword: null,
            confirmPassword: null,
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
          label="部门"
          name="departmentId"
          validateTrigger={["onBlur"]}
          rules={[{ required: true, message: "请选择部门!" }]}
        >
          <Select
            options={departmentData}
            style={{ width: "100%" }}
            placeholder="请选择部门s"
            fieldNames={{
              label: "name",
              value: "id",
            }}
          />
        </Form.Item>
        <Form.Item
          label="用户名"
          name="username"
          validateTrigger={["onBlur"]}
          rules={[{ required: true, message: "请输入用户名!" }]}
        >
          <Input
            id={initialValues ? "edit-username" : "create-username"}
            style={{ width: "100%" }}
            placeholder="请输入用户名"
            allowClear
          />
        </Form.Item>
        {renderPasswordFields()}
      </Form>
    </Modal>
  );
}

export default UserInfoModal;
