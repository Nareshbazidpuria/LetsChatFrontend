import { MESSAGE_TYPE } from "../../constant";
import moment from "moment/moment";
import { CONTENT_TYPE } from "../../utils/constant";
import { BaseUrl } from "../../axios/index";

const Message = ({ message }) => {
  return (
    <div
      className={`message p-2 ${
        message?.type === MESSAGE_TYPE?.INCOMMING ? "float-left" : "float-right"
      }`}
      style={{
        borderRadius:
          message?.type === MESSAGE_TYPE?.INCOMMING
            ? ".5rem .5rem .5rem 0"
            : ".5rem .5rem 0 .5rem",
      }}
    >
      {{
        [CONTENT_TYPE.IMAGE]: (
          <img
            src={BaseUrl + message?.message}
            alt="Message"
            className="max-h-96"
          />
        ),
        [CONTENT_TYPE.VIDEO]: (
          <video
            src={BaseUrl + message?.message}
            controls
            // alt="Message"
            // className="max-h-96"
          />
        ),
      }[message.contentType] || <p>{message?.message}</p>}
      {/* {message.contentType === CONTENT_TYPE.IMAGE ? (
        <img
          src={BaseUrl + message?.message}
          alt="Message"
          className="max-h-96"
        />
      ) : (
        <p>{message?.message}</p>
      )} */}
      <span className="flex gap-1 text-xs text-gray-400 float-right">
        {message?.type === MESSAGE_TYPE?.OUTGOING && (
          <span className="flex text-base text-sky-400">
            <ion-icon name="checkmark-done-outline" />
          </span>
        )}
        <span style={{ fontSize: ".7rem" }}>
          {moment(message?.createdAt)?.format("hh:mm A")}
        </span>
      </span>
    </div>
  );
};

export default Message;
