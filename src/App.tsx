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
  const [fooEvents, setFooEvents] = useState([]);

  useEffect(() => {
    if (id) {
      getProblem(id).then((res) => {
        setProblem(res.data.data);
      });
    }
  }, [id]);

  useEffect(() => {
    const handleConnect = () => {
      setIsConnected(true);
      socket.emit("setUserId", userId);
      console.log("Connected");
    };

    const handleDisconnect = () => {
      setIsConnected(false);
    };

    const handleFooEvent = (value) => {
      setFooEvents((previous) => [...previous, value]);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("submissionPayloadResponse", handleFooEvent);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("submissionPayloadResponse", handleFooEvent);
    };
  }, [userId]);

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
