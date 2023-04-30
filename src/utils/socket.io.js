import React, { useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:4001";

function App() {
  // const [response, setResponse] = useState("");

  useEffect(() => {
    return () => {
      const socket = socketIOClient(ENDPOINT, {
        auth: { token: "erwserjw3hoepqw[ro23]q41g29owir23][4oe" },
        // extraHeaders: {
        //   header: "dwwsssssssssssssss",
        // },
      });
      socket.on("FromAPI", (data) => {
        // setResponse(data);
        console.log(data);
        socket.emit("sss", "--------");
      });
    };
  }, []);

  return <p>Hi</p>;
}

export default App;
