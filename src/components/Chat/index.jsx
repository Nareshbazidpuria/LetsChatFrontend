import profile from "../../assets/img/profile.png";

const Chat = ({ name, profilePic, onClick, annonymous, lastMsg, active }) => {
  return (
    <div
      className={`flex items-center gap-3 cursor-pointer ${
        annonymous
          ? "bg-gray-900 text-white text-xl rounded-lg px-3 py-1 hover:bg-gray-950"
          : `px-5 py-2 ${active || "hover:bg-slate-200"}`
      } ${active && "bg-sky-400 text-white"}`}
      onClick={onClick}
    >
      <img
        className={`${annonymous ? "h-16 w-16" : "h-12 w-12"} ${
          active ? "border-white" : "border-sky-600"
        } rounded-full border`}
        src={profilePic || profile}
        alt=""
      />
      <div className="w-4/5">
        <div className="flex justify-between items-center">
          <span>{name}</span>
          <span
            className={`${active ? "text-white" : "text-gray-400"} text-xs`}
          >
            {lastMsg?.time}
          </span>
        </div>
        <div
          className={`flex gap-1 ${
            active ? "text-white" : "text-gray-400"
          } text-xs`}
        >
          {lastMsg?.text && (
            <>
              <span className="flex text-base">
                <ion-icon name="checkmark-done-outline" />
              </span>
              <span>{lastMsg?.text}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
