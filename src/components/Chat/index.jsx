import profile from "../../assets/img/profile.png";

const Chat = ({ name, profilePic, onClick }) => {
  return (
    <div
      className="flex items-center gap-3 px-5 py-2 cursor-pointer hover:bg-slate-200"
      onClick={onClick}
    >
      <img
        className="h-12 rounded-full border border-sky-600"
        src={profilePic || profile}
        alt=""
      />
      <div className="w-4/5">
        <div className="flex justify-between items-center">
          <span>{name}</span>
          <span className="text-gray-400 text-xs">1:24</span>
        </div>
        <div className="flex gap-1 text-gray-400 text-xs">
          <span className="flex text-base">
            <ion-icon name="checkmark-done-outline"></ion-icon>
          </span>
          <span>Hi</span>
        </div>
      </div>
    </div>
  );
};

export default Chat;
