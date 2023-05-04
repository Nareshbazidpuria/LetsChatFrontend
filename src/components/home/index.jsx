import { Input, Tooltip } from "antd";
import profile from "../../assets/img/profile.png";
import random from "../../assets/img/random.gif";
import wallpaper from "../../assets/img/wallpaper.png";
import "./style.css";
import { useEffect, useRef, useState } from "react";
import Chat from "../Chat";
import Message from "../message";
import moment from "moment/moment";
import { MESSAGE_TYPE } from "../../constant";
import { getUsersApi } from "../../apis";
import { BaseUrl } from "../../axios";

const Home = () => {
  const typeMessage = useRef();
  const chatBody = useRef();
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});

  const search = (e) => {
    console.log(e?.target?.value);
  };

  const onChange = (e) => {
    setMsg(e?.target?.value);
  };

  const send = (text) => {
    if (text) {
      setMessages([
        ...messages,
        { msg: text, time: new Date(), type: MESSAGE_TYPE.OUTGOING },
      ]);
      setMsg("");
      typeMessage?.current?.focus();
      chatBody.current.scrollTop = chatBody.current?.scrollHeight;
      setTimeout(() => {
        chatBody.current.scrollTop = chatBody.current?.scrollHeight + 1000;
      }, 200);
    }
  };

  const getUsers = async () => {
    try {
      const res = await getUsersApi();
      if (res?.status === 200) {
        setUsers(res?.data?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!selectedUser?.userName && users?.length) {
      setSelectedUser(users[0]);
    }
    // eslint-disable-next-line
  }, [users]);
  useEffect(() => {
    typeMessage?.current?.focus();
    getUsers();
  }, []);

  return (
    <div className="flex" style={{ height: "calc(max(100vh - 4rem , 36rem))" }}>
      {/* Left Part  */}
      <div className="border w-1/4">
        <div className="flex flex-col gap-3 px-5 py-3 sticky top-16 z-10 bg-white">
          <div className="flex justify-between items-center">
            <span className="text-2xl">Chats</span>
            <span className="flex">
              <ion-icon name="ellipsis-horizontal" />
            </span>
          </div>
          <Input placeholder="Search" onPressEnter={search} />
          <Chat
            name="Anonymous Users"
            profilePic={random}
            annonymous={true}
            onClick={() =>
              setSelectedUser({
                name: "Anonymous Users",
                profilePic: random,
                userName: "random",
              })
            }
          />
        </div>
        <div
          className="overflow-auto"
          style={{ height: "calc(max(100vh - 16rem  , 25.5rem))" }}
        >
          {users?.map((user) => (
            <Chat
              key={user?.userName}
              active={selectedUser?.userName === user?.userName}
              name={user?.name}
              profilePic={user?.profilePic && BaseUrl + user?.profilePic}
              lastMsg={{ text: "Hi", time: "10:10" }}
              onClick={() => setSelectedUser(user)}
            />
          ))}
        </div>
      </div>
      {/* Right Part  */}
      <div className="border border-l-0 w-3/4 relative">
        {/* Chat Header  */}
        {selectedUser?.userName && (
          <>
            <div className="flex justify-between items-center gap-3 px-5 py-2 border-b sticky top-16 z-10 bg-white">
              <Tooltip title="Info">
                <div className="flex gap-3 cursor-pointer">
                  <img
                    className="h-14 w-14 rounded-full"
                    src={
                      selectedUser?.profilePic
                        ? BaseUrl + selectedUser?.profilePic
                        : profile
                    }
                    alt=""
                  />
                  <div className="flex flex-col">
                    <span className="text-xl">{selectedUser?.name}</span>
                    <span className="text-gray-500 text-sm">Online</span>
                  </div>
                </div>
              </Tooltip>
              <div className="flex gap-5 text-2xl text-gray-500">
                <Tooltip title="Video Call">
                  <span className="flex cursor-pointer">
                    <ion-icon name="videocam-outline" />
                  </span>
                </Tooltip>
                <Tooltip title="Call">
                  <span className="flex cursor-pointer">
                    <ion-icon name="call-outline" />
                  </span>
                </Tooltip>
              </div>
            </div>
            {/* Chat Body  */}
            <div
              id="chat-body"
              ref={chatBody}
              className="relative px-5 py-2 overflow-auto"
            >
              <img src={wallpaper} alt="" />
              {messages?.map((message) => (
                <Message
                  key={message?.msg + message?.time}
                  type={message?.type}
                  msg={message?.msg}
                  time={moment(message?.time)?.format("hh:mm A")}
                />
              ))}
            </div>
            {/* Chat Footer  */}
            <div className="flex justify-around items-center text-2xl text-gray-500 py-5 border-t bg-white sticky bottom-0">
              <div className="cursor-pointer">
                <ion-icon name="happy-outline" />
              </div>
              <div className="rotate-45 cursor-pointer">
                <ion-icon name="attach-outline" />
              </div>
              <Input
                className="w-5/6"
                ref={typeMessage}
                id="type-message"
                placeholder="Type a message"
                value={msg}
                onChange={onChange}
                onPressEnter={() => send(msg)}
              />
              {msg ? (
                <div
                  className="cursor-pointer"
                  style={{ color: "var(--primary)" }}
                  onClick={() => send(msg)}
                >
                  <ion-icon name="paper-plane-outline" />
                </div>
              ) : (
                <div className="cursor-pointer">
                  <ion-icon name="mic-outline" />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
