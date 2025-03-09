import { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Call = () => {
  const state = useSelector((state) => state);
  const [stream, setStream] = useState();
  const myVideo = useRef();
  const userVideo = useRef();

  useEffect(() => {
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

  return (
    <div className="h-screen relative flex justify-center items-center bg-gray-950">
      <span className="text-white absolute top-2 left-4 text-xl">
        {state?.selectedUser?.name || ""}
      </span>
      {stream ? (
        <>
          <Draggable bounds="parent">
            <video
              className="absolute rounded-xl right-5 top-3 max-h-52 z-10 shadow-lg cursor-move"
              playsInline
              muted
              ref={myVideo}
              autoPlay
            />
          </Draggable>
          <video
            playsInline
            ref={userVideo}
            autoPlay
            muted
            className="min-h-screen"
          />
          <div className="fixed bottom-5  transition-all">
            <Link to="/">
              <span
                className="text-white bg-red-600 flex rounded-full text-4xl p-3 cursor-pointer"
                style={{ transform: "rotate(135deg)" }}
              >
                <ion-icon name="call" />
              </span>
            </Link>
          </div>
        </>
      ) : (
        <div className="text-white">calling</div>
      )}
    </div>
  );
};

export default Call;
