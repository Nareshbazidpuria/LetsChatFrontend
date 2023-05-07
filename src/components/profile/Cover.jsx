import profile from "../../assets/img/profile.png";

const Cover = ({ user }) => {
  return (
    <div className="px-4 h-48 bg-gradient-to-r from-sky-200 to-rose-200">
      <img
        className="relative top-32 h-32 w-32 border-4 border-white rounded-full bg-white"
        src={user?.profilePic || profile}
        alt=""
      />
    </div>
  );
};

export default Cover;
