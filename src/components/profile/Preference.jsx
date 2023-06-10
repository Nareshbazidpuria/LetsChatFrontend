import { Select, Switch, message } from "antd";
import { useEffect, useState } from "react";
import { getProfileApi, setPreferencesApi } from "../../apis";
import { BaseUrl } from "../../axios";
import { useDispatch } from "react-redux";
import { setDarkMode, setUser } from "../../redux/actions";

const Preference = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState();

  const setPreferences = async () => {
    try {
      setLoading(true);
      let res = await setPreferencesApi(payload);
      if (res?.status === 200) message.success(res?.data?.message);
      else message.error(res?.data?.message);
      setLoading(false);
      getProfile();
    } catch (error) {
      message.error(error?.data?.message);
      setLoading(false);
    }
  };

  const getProfile = async () => {
    try {
      let res = await getProfileApi();
      if (res?.status === 200) {
        const user = res?.data?.data;
        if (user?.profilePic) {
          user.profilePic = BaseUrl + user.profilePic;
          localStorage.setItem("user", JSON.stringify(user));
          setPayload(user.preferences);
          dispatch(setUser(user));
          dispatch(setDarkMode(user?.preferences?.darkMode));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
    // eslint-disable-next-line
  }, []);

  return (
    <div
      className="flex flex-col gap-4 bg-white m-3 rounded-xl overflow-hidden shadow py-5 px-10"
      style={{ minHeight: "calc(100vh - 5.5rem)" }}
    >
      <h1 className="text-2xl mb-5">Preferences</h1>
      <div className="flex justify-between">
        <span>Dark Mode</span>
        <Switch
          className="bg-sky-200"
          loading={false}
          checked={payload?.darkMode}
          onChange={(e) => setPayload({ ...payload, darkMode: e })}
        />
      </div>
      <div className="flex justify-between">
        <span>Show Email</span>
        <Switch
          className="bg-sky-200"
          loading={false}
          checked={payload?.showEmail}
          onChange={(e) => setPayload({ ...payload, showEmail: e })}
        />
      </div>
      <div className="flex justify-between">
        <span>Profile Photo</span>
        <Select
          value={payload?.showProfilePic}
          style={{
            width: 200,
          }}
          onChange={(e) => setPayload({ ...payload, showProfilePic: e })}
          options={[
            {
              value: "all",
              label: (
                <div className="flex items-center gap-1">
                  <ion-icon name="people-outline" />
                  <span>All</span>
                </div>
              ),
            },
            {
              value: "friends",
              label: (
                <div className="flex items-center gap-1">
                  <ion-icon name="people-outline" />
                  <span>Friends</span>
                </div>
              ),
            },
            {
              value: "onlyMe",
              label: (
                <div className="flex items-center gap-1">
                  <ion-icon name="person-outline" />
                  <span>Only Me</span>
                </div>
              ),
            },
          ]}
        />
      </div>
      <div className="flex justify-between">
        <span>Emojis</span>
        <Select
          value={payload?.emoji}
          style={{
            width: 200,
          }}
          onChange={(e) => setPayload({ ...payload, emoji: e })}
          options={[
            { label: "Facebook", value: "facebook" },
            { label: "Native", value: "native" },
            { label: "Apple", value: "apple" },
            { label: "Twitter", value: "twitter" },
            { label: "Google", value: "google" },
          ]}
        />
      </div>
      <button
        className={`bg-sky-500 text-white px-5 py-2 mt-4 rounded w-40 text-center outline-none ${
          loading ? "cursor-no-drop" : "cursor-pointer"
        }`}
        disabled={loading}
        htmltype="submit"
        onClick={setPreferences}
      >
        Save Changes
      </button>
    </div>
  );
};

export default Preference;
