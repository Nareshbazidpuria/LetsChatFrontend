import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { signUpApi } from "../../apis";
import { useEffect } from "react";

const SignUp = () => {
  const navigate = useNavigate();
  const onFinish = async (payload) => {
    try {
      delete payload.confirmPassword;
      const response = await signUpApi(payload);
      if (response?.status === 201) {
        message.success(response?.data?.message);
        navigate("/LetsChatFrontend/signin");
      } else message.success(response?.data?.message);
    } catch (error) {
      message.error(error?.data?.message);
    }
  };

  useEffect(() => {
    if (localStorage.user) {
      navigate("/LetsChatFrontend");
    }
  }, [navigate]);

  return (
    <div
      className="login flex items-center justify-center"
      style={{ background: "var(--primary)" }}
    >
      <div className="flex flex-col gap-12 bg-white w-2/5 px-20 py-12">
        <div
          className="text-2xl text-center"
          style={{ color: "var(--primary)" }}
        >
          Create Account
        </div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please enter your name !",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Name"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter email !",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="userName"
            rules={[
              {
                required: true,
                message: "Please enter your Username !",
              },
              {
                max: 20,
                message: "Username can be 20 character long",
              },
              {
                pattern: /^(?![0-9_])[a-z0-9_]{3,30}$/,
                message:
                  "Only lower case, underscore and numbers are allowed !",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please enter your Password!",
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
              placeholder="Password"
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
                  if (!value || getFieldValue("password") === value) {
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

          <div className="flex justify-between gap-5">
            <Link to="/LetsChatFrontend/signin">
              <Form.Item>
                <Button
                  className="login-form-button"
                  style={{
                    background: "#fff",
                    color: "var(--primary)",
                  }}
                >
                  Login
                </Button>
              </Form.Item>
            </Link>
            <Form.Item>
              <Button htmlType="submit" className="login-form-button">
                <div>Sign Up</div>
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};
export default SignUp;
