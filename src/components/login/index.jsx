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
          navigate("/LetsChatFrontend");
        } else message.error(profile?.data?.message);
      } else message.error(response?.data?.message);
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
          Login
        </div>
        <Form
          name="login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="userName"
            rules={[
              {
                required: true,
                message: "Please enter your Username!",
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
          <div className="flex justify-between gap-5">
            <Link to="/LetsChatFrontend/signup">
              <Form.Item>
                <Button
                  className="login-form-button"
                  style={{
                    background: "#fff",
                    color: "var(--primary)",
                  }}
                >
                  Sign Up
                </Button>
              </Form.Item>
            </Link>
            <Form.Item>
              <Button htmlType="submit" className="login-form-button">
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
