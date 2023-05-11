import { MESSAGE_TYPE } from "../../constant";
import moment from "moment/moment";

const Message = ({ message }) => {
  return (
    <div
      className={`message p-2 ${
        message?.type === MESSAGE_TYPE?.INCOMMING ? "float-left" : "float-right"
      }`}
    >
      <p>{message?.message}</p>
      <span className="flex gap-1 text-xs text-gray-400 float-right">
        <span className="flex text-base text-sky-400">
          <ion-icon name="checkmark-done-outline" />
        </span>
        <span className="text-xs">
          {moment(message?.createdAt)?.format("hh:mm A")}
        </span>
      </span>
    </div>
  );
};

export default Message;
