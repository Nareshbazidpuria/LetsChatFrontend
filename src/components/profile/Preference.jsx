import { Select, Switch } from "antd";
import { useState } from "react";

const Preference = () => {
  const [loading, setLoading] = useState(false);

  const onChange = (checked) => {
    console.log(checked);
  };

  return (
    <div
      className="flex flex-col gap-4 bg-white m-3 rounded-xl overflow-hidden shadow py-5 px-10"
      style={{ minHeight: "calc(100vh - 5.5rem)" }}
    >
      <h1 className="text-2xl mb-5">Preferences</h1>
      <div className="flex justify-between">
        <span>Dark Mode</span>
        <Switch
          name="darkMode"
          className="bg-sky-200"
          loading={false}
          defaultChecked={false}
          onChange={onChange}
        />
      </div>
      <div className="flex justify-between">
        <span>Show Email</span>
        <Switch
          className="bg-sky-200"
          loading={false}
          defaultChecked={true}
          onChange={onChange}
        />
      </div>
      <div className="flex justify-between">
        <span>Profile Photo</span>
        <Select
          defaultValue="all"
          style={{
            width: 200,
          }}
          onChange={onChange}
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
          defaultValue="facebook"
          style={{
            width: 200,
          }}
          onChange={onChange}
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
      >
        Save Changes
      </button>
    </div>
  );
};

export default Preference;
