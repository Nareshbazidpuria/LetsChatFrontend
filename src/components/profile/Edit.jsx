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

  useEffect(() => {
    setProfilePic(BaseUrl + JSON.parse(localStorage.user)?.profilePic);
    setUser(JSON.parse(localStorage.user));
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="text-3xl bg-slate-50 px-10 py-5">Edit Profile</div>
      <div className="relative h-32 px-10 py-2">
        {loading ? (
          <div className="absolute h-32 w-32 border-2 border-dotted border-sky-600 rounded-full flex items-center justify-center">
            <Spin size="large" />
          </div>
        ) : (
          <img
            className="absolute h-32 w-32 border-2 border-dotted border-sky-600 rounded-full cursor-pointer"
            src={profilePic || profile}
            alt=""
          />
        )}
        <Form.Item>
          <Form.Item
            name="dragger"
            valuePropName="fileList"
            getValueFromEvent={""}
          >
            <Upload.Dragger name="file" customRequest={uploadImage}>
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
      <div className="text-lg px-10 py-4"></div>
    </div>
  );
};

export default Edit;
