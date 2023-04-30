import { MESSAGE_TYPE } from "../../constant";

const Message = ({ msg, time, type }) => {
  return (
    <div
      className={`message p-2 ${
        type === MESSAGE_TYPE?.INCOMMING ? "float-left" : "float-right"
      }`}
    >
      <p>{msg}</p>
      <span className="flex gap-1 text-xs text-gray-400 float-right">
        <span className="flex text-base text-sky-400">
          <ion-icon name="checkmark-done-outline" />
        </span>
        <span className="text-xs">{time}</span>
      </span>
    </div>
  );
};

export default Message;
