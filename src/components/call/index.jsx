// import { useEffect, useRef, useState } from "react";
// import Peer from "simple-peer";
// import { connectToSocketApi, socket } from "../../apis/socket";

import { useEffect, useRef, useState } from "react";

const Call = () => {
  // const [me, setMe] = useState("");
  const [stream, setStream] = useState();
  // const [receivingCall, setReceivingCall] = useState(false);
  // const [caller, setCaller] = useState("");
  // const [callerSignal, setCallerSignal] = useState();
  // const [callAccepted, setCallAccepted] = useState(false);
  // const [idToCall, setIdToCall] = useState("");
  // const [callEnded, setCallEnded] = useState(false);
  // const [name, setName] = useState("");
  const myVideo = useRef();
  const userVideo = useRef();
  // const connectionRef = useRef();

  useEffect(() => {
    // connectToSocketApi();
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        setStream(stream);
        myVideo.current.srcObject = stream;
        userVideo.current.srcObject = stream;
      });
  }, []);

  //   socket.on("me", (id) => {
  //     setMe(id);
  //   });

  //   socket.on("callUser", (data) => {
  //     setReceivingCall(true);
  //     setCaller(data.from);
  //     setName(data.name);
  //     setCallerSignal(data.signal);
  //   });
  // }, []);

  // const callUser = (id) => {
  //   const peer = new Peer({
  //     initiator: true,
  //     trickle: false,
  //     stream: stream,
  //   });
  //   peer.on("signal", (data) => {
  //     socket.emit("callUser", {
  //       userToCall: id,
  //       signalData: data,
  //       from: me,
  //       name: name,
  //     });
  //   });
  //   peer.on("stream", (stream) => {
  //     userVideo.current.srcObject = stream;
  //   });
  //   socket.on("callAccepted", (signal) => {
  //     setCallAccepted(true);
  //     peer.signal(signal);
  //   });

  //   connectionRef.current = peer;
  // };

  // const answerCall = () => {
  //   setCallAccepted(true);
  //   const peer = new Peer({
  //     initiator: false,
  //     trickle: false,
  //     stream: stream,
  //   });
  //   peer.on("signal", (data) => {
  //     socket.emit("answerCall", { signal: data, to: caller });
  //   });
  //   peer.on("stream", (stream) => {
  //     userVideo.current.srcObject = stream;
  //   });

  //   peer.signal(callerSignal);
  //   connectionRef.current = peer;
  // };

  // const leaveCall = (data) => {
  //   setCallEnded(true);
  //   socket.emit("callEnded", { to: idToCall || caller });
  //   connectionRef.current.destroy();
  // };

  return (
    <div className="h-screen relative flex justify-center items-center bg-gray-950">
      {stream ? (
        <>
          <video
            className="absolute rounded-xl right-5 top-3 max-h-52 z-10 shadow-lg"
            playsInline
            muted
            ref={myVideo}
            autoPlay
          />
          <video
            playsInline
            ref={userVideo}
            autoPlay
            muted
            className="min-h-screen"
          />
          <div className="fixed bottom-5  transition-all">
            <span
              className="text-white bg-red-600 flex rounded-full text-4xl p-3 cursor-pointer"
              style={{ transform: "rotate(135deg)" }}
            >
              <ion-icon name="call" />
            </span>
          </div>
        </>
      ) : (
        <div className="text-white">caalling</div>
      )}
    </div>
  );
};

export default Call;
