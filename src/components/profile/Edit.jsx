import { EditOutlined } from "@ant-design/icons";
import profile from "../../assets/img/profile.png";
import { Form, Spin, Tooltip, Upload, message } from "antd";
import { updateProfileApi, uploadImageApi } from "../../apis";
import { useEffect, useState } from "react";
import { BaseUrl } from "../../axios";

const Edit = () => {
  const [profilePic, setProfilePic] = useState();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  const [payload, setPayload] = useState();

  const uploadImage = async ({ file }) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", file);
      let res = await uploadImageApi(formData);
      if (res?.status === 200) {
        const profile = await updateProfileApi({
          profilePic: res?.data?.data?.src,
        });
        if (profile?.status === 200) {
          message.success(res?.data?.message);
          setProfilePic(BaseUrl + profile?.data?.data?.profilePic);
          setLoading(false);
          localStorage.setItem("user", JSON.stringify(profile?.data?.data));
        }
      } else {
        setLoading(false);
        message.error(res?.data?.message);
      }
    } catch (error) {
      setLoading(false);
      message.error(error?.data?.message);
    }
  };

  const updateProfile = async () => {
    try {
      setLoading(true);
      let res = await updateProfileApi(payload);
      if (res?.status === 200) {
        setLoading(false);
        message.success(res?.data?.message);
        localStorage.setItem("user", JSON.stringify(res?.data?.data));
      } else {
        setLoading(false);
        message.error(res?.data?.message);
      }
    } catch (error) {
      setLoading(false);
      message.error(error?.data?.message);
    }
  };

  const onChange = (e) => setPayload({ [e?.target?.name]: e?.target?.value });

  useEffect(() => {
    setProfilePic(BaseUrl + JSON.parse(localStorage.user)?.profilePic);
    setUser(JSON.parse(localStorage.user));
  }, []);

  useEffect(() => {
    setPayload({
      name: user?.name,
      email: user?.email,
    });
  }, [user]);

  return (
    <div
      className="flex flex-col gap-4 bg-white m-3 rounded-xl overflow-hidden shadow"
      style={{ minHeight: "calc(100vh - 5.5rem)" }}
    >
      <div className="px-4 h-48 bg-gradient-to-r from-sky-200 to-rose-200">
        {loading ? (
          <div className="absolute top-36 h-32 w-32 bg-white border-2 border-dotted border-sky-600 rounded-full flex items-center justify-center">
            <Spin size="large" />
          </div>
        ) : (
          <img
            className="absolute bg-white top-36 h-32 w-32 border-2 border-dotted border-sky-600 rounded-full cursor-pointer"
            src={profilePic || profile}
            alt=""
          />
        )}
        <Form.Item className="absolute top-36">
          <Form.Item name="dragger" valuePropName="fileList">
            <Upload.Dragger
              name="file"
              customRequest={uploadImage}
              accept="image/png, image/jpeg, image/jpg"
            >
              <Tooltip title="Click or drag file to upload">
                <div
                  className="absolute top-0 z-10 h-32 w-32 text-3xl text-white cursor-pointer rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-all"
                  style={{ background: "#00000080" }}
                >
                  <EditOutlined />
                </div>
              </Tooltip>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
      </div>
      <div className="px-10 py-4 mt-20 flex flex-col gap-2">
        {loading ? (
          <div className="flex justify-center items-center h-52">
            <Spin size="large" />
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Username</label>
              <input
                className="border-b outline-none py-1 px-2 cursor-no-drop"
                type="text"
                disabled
                value={user?.userName}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Name</label>
              <input
                className="border-b outline-none py-1 px-2"
                type="text"
                name="name"
                value={payload?.name}
                onChange={onChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Email</label>
              <input
                className="border-b outline-none py-1 px-2"
                type="email"
                name="email"
                value={payload?.email}
                onChange={onChange}
              />
            </div>
          </>
        )}
        <button
          className={`bg-sky-500 text-white px-5 py-2 mt-4 rounded w-32 text-center ${
            loading ? "cursor-no-drop" : "cursor-pointer"
          }`}
          onClick={updateProfile}
          disabled={loading}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Edit;
