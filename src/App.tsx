import "./App.css";

import { useEffect, useState } from "react";

import { ConnectionManager } from "./components/ConnectionManager";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import SampleProblem1 from "./constant/SampleProblem1";
import Description from "./pages/Description/Description";
import { socket } from "./socket";
import { getProblem } from "./apis/problem.api";

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const userId = "1";

  const [problem, setProblem] = useState(SampleProblem1);

  useEffect(() => {
    getProblem("671762b9398a9fbe9f244a0c").then((res) => {
      setProblem(res.data);
    });
  }, []);

  const [fooEvents, setFooEvents] = useState([]);
  console.log(fooEvents);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      socket.emit("setUserId", userId);
      console.log("Connected");
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value) {
      setFooEvents((previous) => [...previous, value]);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("submissionPayloadResponse", onFooEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("submissionPayloadResponse", onFooEvent);
    };
  }, []);

  if (!problem) return null;

  return (
    <>
      <ConnectionManager isConnected={isConnected} />
      <Navbar />
      <Description descriptionText={problem?.data.description} />
      <Sidebar />
    </>
  );
}

export default App;
