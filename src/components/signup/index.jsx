import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
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
        navigate("/signin");
      } else message.success(response?.data?.message);
    } catch (error) {
      message.error(error?.data?.message);
    }
  };

  useEffect(() => {
    if (localStorage.user) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div
      className="login flex items-center justify-center"
      style={{ background: "var(--primary)" }}
    >
      <div className="flex flex-col gap-12 bg-white md:w-4/5 lg:w-2/5 sm:w-full py-12 lg:px-20 md:px-20 sm:px-12 px-4">
        <div className="text-2xl text-center text-[var(--primary)]">
          Create Account
        </div>
        <Form
          name="normal_login"
          className="login-form flex items-center flex-col"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            className="lg:w-full md:w-full sm:w-4/5 w-4/5"
            rules={[
              {
                required: true,
                message: "Please enter your name !",
              },
            ]}
          >
            <Input
              className="p-3 rounded-none text-lg"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Name"
            />
          </Form.Item>
          <Form.Item
            className="lg:w-full md:w-full sm:w-4/5 w-4/5"
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter email !",
              },
            ]}
          >
            <Input
              className="p-3 rounded-none text-lg"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            className="lg:w-full md:w-full sm:w-4/5 w-4/5"
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
              className="p-3 rounded-none text-lg"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            className="lg:w-full md:w-full sm:w-4/5 w-4/5"
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
              className="p-3 rounded-none text-lg"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item
            className="lg:w-full md:w-full sm:w-4/5 w-4/5"
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
              className="p-3 rounded-none text-lg"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Confirm Password"
            />
          </Form.Item>
          <div className="flex justify-between lg:w-full md:w-full sm:w-4/5 w-4/5 gap-5">
            <Link to="/signin" className="w-1/2">
              <Form.Item className="w-full">
                <Button className="login-form-button text-lg w-full rounded-none py-1 text-[var(--primary)] h-14">
                  Login
                </Button>
              </Form.Item>
            </Link>
            <Form.Item className="w-1/2">
              <Button
                htmlType="submit"
                className="login-form-button text-lg w-full rounded-none py-1 bg-[var(--primary)] text-white h-14"
              >
                Sign Up
              </Button>
            </Form.Item>
          </div>
          {/* <div className="flex justify-between lg:w-full md:w-full sm:w-4/5 w-4/5 gap-5">
            <Link to="/signin" className="w-1/2">
              <Form.Item className="w-full">
                <Button className="login-form-button text-lg w-full rounded-none py-1 text-[var(--primary)] h-14">
                  Sign Up
                </Button>
              </Form.Item>
            </Link>
            <Form.Item className="w-1/2">
              <Button
                htmlType="submit"
                className="login-form-button text-lg w-full rounded-none py-1 bg-[var(--primary)] text-white h-14"
              >
                Login
              </Button>
            </Form.Item>
          </div> */}
        </Form>
      </div>
    </div>
  );
};
export default SignUp;
