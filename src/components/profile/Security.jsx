import { Form, Input, message } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useState } from "react";
import { changePasswordApi } from "../../apis";

const Security = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const changePassword = async (payload) => {
    try {
      setLoading(true);
      const res = await changePasswordApi(payload);
      if (res?.status === 200) message.success(res?.data?.message);
      else message.error(res?.data?.message);
      setLoading(false);
      form.resetFields();
    } catch (error) {
      setLoading(false);
      message.error(error?.data?.message);
    }
  };

  const onFinish = async (payload) => {
    delete payload.confirmPassword;
    changePassword(payload);
  };

  return (
    <div
      className="flex flex-col gap-4 bg-white m-3 rounded-xl overflow-hidden shadow"
      style={{ minHeight: "calc(100vh - 5.5rem)" }}
    >
      <h1 className="text-2xl py-5 px-10">Change Password</h1>
      <div className="px-10">
        <Form
          form={form}
          name="changePassword"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="currentPassword"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please enter your Password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Current Password"
            />
          </Form.Item>
          <Form.Item
            name="newPassword"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please enter New Password!",
              },
              {
                min: 8,
                message: "Password should be atleast 8 character long",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="New Password"
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please enter Confirm Password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords did not match !"));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Confirm Password"
            />
          </Form.Item>
          <Form.Item>
            <button
              className={`bg-sky-500 text-white px-5 py-2 mt-4 rounded w-32 text-center outline-none ${
                loading ? "cursor-no-drop" : "cursor-pointer"
              }`}
              disabled={loading}
              htmltype="submit"
            >
              Change
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Security;
