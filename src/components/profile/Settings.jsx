import Cover from "./Cover";

const Settings = () => {
  return (
    <div
      className="flex flex-col gap-4 bg-white m-3 rounded-xl overflow-hidden shadow"
      style={{ minHeight: "calc(100vh - 5.5rem)" }}
    >
      <Cover />
    </div>
  );
};

export default Settings;
