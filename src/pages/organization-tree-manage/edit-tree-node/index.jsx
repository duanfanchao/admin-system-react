import { useEffect } from "react";
import { Modal, Form, Input, Select, message } from "antd";
import {
  editOrganizationTreeNode,
  addOrganizationTreeDataF,
} from "@/features/organizationTree/api";

function EditTreeNode({
  visible,
  onCancel,
  onFinish,
  initialValues,
  firstOrganizationList,
  secondOrganizationList,
}) {
  const [form] = Form.useForm();
  const resetForm = () => {
    form.setFieldsValue({
      firstOrganizationId: null,
      secondOrganizationId: null,
      thirdOrganizationName: null,
    })
    form.resetFields();
  }
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (initialValues?.id) {
        // 编辑
        editOrganizationTreeNode({
          id: initialValues.id,
          name: values.thirdOrganizationName,
          parentId: initialValues.parentId,
        }).then(({ code, data, resultMsg }) => {
          if (code === 0) {
            message.success(resultMsg);
            resetForm();
            onCancel();
            onFinish(values);
          } else {
            message.error(resultMsg);
          }
        });
      } else {
        // 新增
        addOrganizationTreeDataF(values).then(({ code, data, resultMsg }) => {
          if (code === 0) {
            message.success(resultMsg);
            resetForm();
            onCancel();
            onFinish(values);
          } else {
            message.error(resultMsg);
          }
        });
      }
    } catch (error) {
      console.log("验证失败:", error);
    }
  };
  return (
    <Modal
      open={visible}
      title={initialValues?.id ? "编辑节点" : "新增节点"}
      onOk={handleOk}
      onCancel={onCancel}
    >
      <Form form={form} layout="vertical" initialValues={initialValues}>
        <Form.Item
          name="firstOrganizationId"
          label="一级组织"
          rules={[{ required: true, message: "请输入一级组织" }]}
        >
          <Select
            options={firstOrganizationList}
            placeholder="请选择一级组织"
            disabled={!!initialValues?.id}
            fieldNames={{ label: "name", value: 'id' }}
          />
        </Form.Item>
        <Form.Item
          name="secondOrganizationId"
          label="二级组织"
          rules={[{ required: true, message: "请输入二级组织" }]}
        >
          <Select
            disabled={!!initialValues?.id}
            options={secondOrganizationList}
            placeholder="请选择二级组织"
            fieldNames={{ label: "name", value: 'id' }}
          />
        </Form.Item>
        <Form.Item
          name="thirdOrganizationName"
          label="部门名称"
          rules={[{ required: true, message: "请输入部门名称" }]}
        >
          <Input placeholder="部门名称" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EditTreeNode;
