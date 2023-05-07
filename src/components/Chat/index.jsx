import profile from "../../assets/img/profile.png";

const Chat = ({ user, onClick, annonymous, active }) => {
  return (
    <div
      className={`flex items-center gap-3 cursor-pointer rounded-lg ${
        annonymous
          ? "bg-gray-900 text-white text-xl px-3 py-1 hover:bg-gray-950"
          : `px-5 py-2 ${active || "hover:bg-slate-200"}`
      } ${active && "bg-sky-400 text-white"}`}
      onClick={onClick}
    >
      <img
        className={`${annonymous ? "h-16 w-16" : "h-12 w-12"} ${
          active ? "border-white" : "border-sky-600"
        } rounded-full border`}
        src={user?.profilePic || profile}
        alt=""
      />
      <div className="w-4/5">
        <div className="flex justify-between items-center">
          <span>{user?.name}</span>
          <span
            className={`${active ? "text-white" : "text-gray-400"} text-xs`}
          >
            {user?.lastMsg?.time}
          </span>
        </div>
        <div
          className={`flex gap-1 ${
            active ? "text-white" : "text-gray-400"
          } text-xs`}
        >
          {user?.lastMsg?.text ? (
            <>
              <span className="flex text-base">
                <ion-icon name="checkmark-done-outline" />
              </span>
              <span>{user?.lastMsg?.text}</span>
            </>
          ) : (
            <div className="h-5">
              <i>Start Conversation</i>{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
