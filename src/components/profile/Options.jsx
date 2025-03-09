import { Link } from "react-router-dom";

const Options = ({ icon, label, active, to, onClick }) => {
  return (
    <Link to={`/profile${to || ""}`}>
      <div
        className={`py-3 px-5 m-1 rounded cursor-pointer flex gap-5 items-center ${
          active ? "bg-sky-500 text-white" : "text-gray-700 hover:bg-sky-100"
        }`}
        onClick={onClick}
      >
        <span className="flex text-xl">{icon}</span>
        <span>{label}</span>
      </div>
    </Link>
  );
};

export default Options;
