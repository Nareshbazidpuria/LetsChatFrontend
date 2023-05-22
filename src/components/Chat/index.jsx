import moment from "moment";
import profile from "../../assets/img/profile.png";
import { MESSAGE_TYPE } from "../../constant";

const Chat = ({ user, onClick, annonymous, active }) => {
  return (
    <div
      className={`flex items-center gap-3 cursor-pointer rounded-lg ${
        annonymous
          ? "bg-gray-900 text-white text-xl px-3 py-1 hover:bg-gray-950"
          : `px-5 py-2 ${active || "hover:bg-slate-200 my-1"}`
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
            {user?.room?.lastMessage?.createdAt &&
              moment(user?.room?.lastMessage?.createdAt).format("hh:mm A")}
          </span>
        </div>
        <div
          className={`flex gap-1 ${
            active ? "text-white" : "text-gray-400"
          } text-xs`}
        >
          {user?.room?.lastMessage?.message ? (
            <>
              {user?.room?.lastMessage?.type === MESSAGE_TYPE.OUTGOING && (
                <span className="flex text-base">
                  <ion-icon name="checkmark-done-outline" />
                </span>
              )}
              <span>{user?.room?.lastMessage?.message}</span>
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
