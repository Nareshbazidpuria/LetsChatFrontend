import { Input, Popover, Spin, Tabs, Tooltip } from "antd";
import profile from "../../assets/img/profile.png";
import verified from "../../assets/img/verified.png";
import random from "../../assets/img/random.gif";
import wallpaper from "../../assets/img/wallpaper.png";
import "./style.css";
import { useEffect, useRef, useState } from "react";
import Chat from "../chat";
import Message from "../message";
import { MESSAGE_TYPE } from "../../constant";
import { getMsgsApi, getReqsApi, getUsersApi, sendMsgApi } from "../../apis";
import { BaseUrl } from "../../axios";
import logo from "../../assets/img/logo.png";
import { connectToSocketApi, socket } from "../../apis/socket";
import UserTab from "./UserTab";
import Friends from "./Friends";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../../redux/actions";
import People from "./People";
import Requests from "./Requests";
import TextArea from "antd/es/input/TextArea";
import EmojiPicker from "emoji-picker-react";

const Home = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const typeMessage = useRef();
  const chatBody = useRef();
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("friends");
  const [loadingChat, setLoadingChat] = useState(false);
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const onChange = (e) => setMsg(e?.target?.value);

  const selectEmoji = (emoji) => setMsg(msg + emoji.emoji);

  const sendMessage = async (roomId, message) => {
    try {
      if (roomId && message) await sendMsgApi(roomId, { message });
    } catch (error) {
      console.log(error);
    }
  };

  const send = (message, e) => {
    e && e.preventDefault();
    message = message?.trim();
    if (message) {
      socket.emit("message", {
        message,
        roomId: state?.selectedUser?.room?._id,
      });
      setMessages([
        ...messages,
        { message, createdAt: new Date(), type: MESSAGE_TYPE.OUTGOING },
      ]);
      sendMessage(state?.selectedUser?.room?._id, msg);
      setMsg("");
      typeMessage?.current?.focus();
      chatBody.current.scrollTop = chatBody.current?.scrollHeight;
      setTimeout(() => {
        chatBody.current.scrollTop = chatBody.current?.scrollHeight + 1000;
      }, 200);
    }
  };

  const getUsers = async (params, type) => {
    try {
      let res;
      if (type === "reqs") {
        res = await getReqsApi(params);
      } else {
        res = await getUsersApi(params);
      }
      if (res?.status === 200) {
        const users = res?.data?.data?.data?.map((user) => {
          if (user?.profilePic) user.profilePic = BaseUrl + user.profilePic;
          return user;
        });
        setUsers(users);
      }
    } catch (error) {
      setUsers();
      console.log(error);
    }
  };

  const listenReceive = () => {
    socket.on("receive", ({ message, createdAt }) => {
      setMessages([
        ...messages,
        { message, createdAt, type: MESSAGE_TYPE.INCOMMING },
      ]);
      document.querySelector("#chat-body").scrollTop =
        chatBody.current?.scrollHeight;
      setTimeout(() => {
        document.querySelector("#chat-body").scrollTop =
          chatBody.current?.scrollHeight + 1000;
      }, 200);
    });
  };

  const onUserTabChange = (key) => {
    setActiveTab(key);
    if (key === "reqs") getUsers({}, "reqs");
    else if (key === "friends") getUsers({ type: "friends" });
    else getUsers();
  };

  const search = (e) => {
    if (activeTab === "reqs") getUsers({ name: e?.target?.value }, "reqs");
    else if (activeTab === "friends")
      getUsers({ name: e?.target?.value, type: "friends" });
    else getUsers({ name: e?.target?.value });
  };

  const joinChat = async (user) => {
    try {
      setPage(1);
      typeMessage.current.focus();
      setLoadingChat(true);
      setMessages([]);
      if (user?.room?._id) {
        let res = await getMsgsApi(user.room._id, 1);
        if (
          res?.status === 200 &&
          user.room._id !== "644d362526d8c8d7b063e6ca"
        ) {
          setTotalRecords(res?.data?.data?.totalRecords);
          setLoadingChat(false);
          setMessages(res?.data?.data?.data);
          setTimeout(() => {
            document.querySelector("#chat-body").scrollTop =
              chatBody.current?.scrollHeight;
          }, 200);
        }
      }
      setLoadingChat(false);
    } catch (error) {
      setLoadingChat(false);
      console.log(error);
    }
  };

  const handleNextPageCall = async () => {
    try {
      if (messages?.length < totalRecords) {
        setLoadingChat(true);
        let res = await getMsgsApi(state.selectedUser.room._id, page + 1);
        if (
          res?.status === 200 &&
          state.selectedUser.room._id !== "644d362526d8c8d7b063e6ca"
        ) {
          setTimeout(
            () => (document.querySelector("#chat-body").scrollTop = 20),
            300
          );
          setPage(page + 1);
          setMessages([...res.data.data.data, ...messages]);
        }
        setLoadingChat(false);
      }
    } catch (error) {
      setLoadingChat(false);
    }
  };

  const onScroll = async () => {
    if (chatBody.current && chatBody.current.scrollTop === 0)
      messages?.length && handleNextPageCall();
  };

  const items = [
    {
      key: "friends",
      label: <UserTab label="Friends" icon="people-outline" />,
      children: <Friends users={users} />,
    },
    {
      key: "reqs",
      label: <UserTab label="Requests" icon="person-outline" />,
      children: <Requests users={users} />,
    },
    {
      key: "people",
      label: <UserTab label="People" icon="person-add-outline" />,
      children: <People users={users} />,
    },
  ];

  useEffect(() => {
    typeMessage?.current?.focus();
    getUsers({ type: "friends" });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!socket) connectToSocketApi();
  }, []);

  useEffect(() => {
    if (state.selectedUser) joinChat(state.selectedUser);
  }, [state.selectedUser]);

  useEffect(() => listenReceive());

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
          <Input placeholder="Search" onChange={search} onPressEnter={search} />
          <Chat
            user={{ name: "Anonymous Users", profilePic: random }}
            annonymous={true}
            onClick={() =>
              dispatch(
                setSelectedUser({
                  name: "Anonymous Users",
                  profilePic: random,
                  userName: "random",
                  annonymous: true,
                  room: { _id: "644d362526d8c8d7b063e6ca" },
                })
              )
            }
          />
        </div>
        <Tabs
          className="flex w-full items-center"
          defaultActiveKey="1"
          onChange={onUserTabChange}
          items={items}
        />
      </div>
      {/* Right Part  */}
      <div className="border border-l-0 w-3/4 relative">
        {/* Chat Header  */}
        {state.selectedUser?.userName ? (
          <>
            <div className="flex justify-between items-center gap-3 px-5 py-2 border-b sticky top-16 z-10 bg-white">
              <Tooltip title="Info">
                <div className="flex gap-3 cursor-pointer">
                  <img
                    className="h-14 w-14 rounded-full"
                    src={state.selectedUser?.profilePic || profile}
                    alt=""
                  />
                  {state.selectedUser?.verified && (
                    <img
                      className="absolute h-5 w-5 bottom-2 left-14"
                      src={verified}
                      alt=""
                    />
                  )}
                  <div className="flex flex-col">
                    <span className="text-xl">{state.selectedUser?.name}</span>
                    <span className="text-gray-500 text-sm">
                      {state.selectedUser?.annonymous
                        ? "You are chatting with anonymous users"
                        : "Online"}
                    </span>
                  </div>
                </div>
              </Tooltip>
              {!state.selectedUser?.annonymous && (
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
              )}
            </div>
            {/* Chat Body  */}
            <div
              id="chat-body"
              ref={chatBody}
              className="relative px-5 py-2 overflow-auto"
              onScroll={onScroll}
            >
              <img src={wallpaper} alt="" />
              {loadingChat && (
                <div className="flex justify-center items-center h-20">
                  <Spin size="large" />
                </div>
              )}
              {messages?.map((message) => (
                <Message
                  key={message?.message + Math.random(Date.now())}
                  message={message}
                />
              ))}
            </div>
            {/* Chat Footer  */}
            <div className="flex justify-around items-center text-2xl text-gray-500 py-5 border-t bg-white sticky bottom-0">
              <div className="cursor-pointer"></div>
              <Popover
                style={{ padding: "0 !important" }}
                placement="topLeft"
                content={
                  <EmojiPicker
                    emojiStyle="facebook"
                    onEmojiClick={selectEmoji}
                  />
                }
                trigger="click"
              >
                <div className="cursor-pointer">
                  <ion-icon name="happy-outline" />
                </div>
              </Popover>
              <div className="rotate-45 cursor-pointer">
                <ion-icon name="attach-outline" />
              </div>
              <TextArea
                className="w-5/6"
                rows={1}
                ref={typeMessage}
                id="type-message"
                placeholder="Type a message"
                value={msg}
                onChange={onChange}
                onPressEnter={(e) => send(msg, e)}
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
        ) : (
          <>
            <div className="h-full flex flex-col justify-center items-center gap-3">
              <img className="h-32 w-32" src={logo} alt="" />
              <span className="text-3xl text-gray-600">Let's Chat</span>
              <span className="text-sm text-gray-600">
                Make friends & enjoy chat
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
