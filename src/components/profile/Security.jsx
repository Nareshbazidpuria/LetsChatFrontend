import { Form, Input } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useState } from "react";

const Security = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (payload) => {
    console.log(payload);
    setLoading(true);
  };

  return (
    <div
      className="flex flex-col gap-4 bg-white m-3 rounded-xl overflow-hidden shadow"
      style={{ minHeight: "calc(100vh - 5.5rem)" }}
    >
      <h1 className="text-2xl py-5 px-10">Change Password</h1>
      <div className="px-10">
        <Form
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
              htmlType="submit"
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
