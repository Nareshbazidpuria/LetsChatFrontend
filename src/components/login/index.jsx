import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { getProfileApi, loginApi } from "../../apis";
import { useEffect } from "react";
import { BaseUrl } from "../../axios";

const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (payload) => {
    try {
      delete payload.confirmPassword;
      const response = await loginApi(payload);
      if (response?.status === 200) {
        localStorage.setItem("accessToken", response?.data?.data?.accessToken);
        const profile = await getProfileApi();
        if (profile?.status === 200) {
          message.success(response?.data?.message);
          const user = profile?.data?.data;
          if (user?.profilePic) user.profilePic = BaseUrl + user.profilePic;
          localStorage.setItem("user", JSON.stringify(user));
          navigate("/");
        } else message.error(profile?.data?.message);
      } else message.error(response?.data?.message);
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
        <div className="text-2xl text-center text-[var(--primary)]">Login</div>
        <Form
          name="login"
          className="login-form flex items-center flex-col"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="userName"
            className="lg:w-full md:w-full sm:w-4/5 w-4/5"
            rules={[
              {
                required: true,
                message: "Please enter your Username!",
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
            name="password"
            className="lg:w-full md:w-full sm:w-4/5 w-4/5"
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
          <div className="flex justify-between lg:w-full md:w-full sm:w-4/5 w-4/5 gap-5">
            <Link to="/signup" className="w-1/2">
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
                <div>Login</div>
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};
export default Login;
