import "./App.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getProblem } from "./apis/problem.api";
import { ConnectionManager } from "./components/ConnectionManager";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Description from "./pages/Description/Description";
import { socket } from "./socket";

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const userId = "1";
  const { id } = useParams();
  const [problem, setProblem] = useState(null);

  useEffect(() => {
    if (id) {
      getProblem(id).then((res) => {
        setProblem(res.data.data);
      });
    }
  }, [id]);

  const [fooEvents, setFooEvents] = useState([]);

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
      <Description descriptionText={problem.description} />
      <Sidebar />
    </>
  );
}

export default App;
