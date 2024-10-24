/* eslint-disable @typescript-eslint/no-explicit-any */
import "./App.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import { getProblem } from "./apis/problem.api";
import { ConnectionManager } from "./components/ConnectionManager";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Description from "./pages/Description/Description";
import { socket } from "./socket";

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const { user } = useAuth();
  const { id } = useParams();
  const [problem, setProblem] = useState<any>(null);
  const [fooEvents, setFooEvents] = useState<any>([]);

  console.log(fooEvents);
  console.log(isConnected);

  useEffect(() => {
    if (id) {
      getProblem(id).then((res) => {
        setProblem(res.data.data);
      });
    }
  }, [id]);

  useEffect(() => {
    if (!user) return; // Don't connect if no user

    const handleConnect = () => {
      setIsConnected(true);
      socket.emit("setUserId", user.uid); // Use Firebase UID
      console.log("Connected with user:", user.uid);
    };

    const handleDisconnect = () => {
      setIsConnected(false);
    };

    const handleFooEvent = (value: any) => {
      setFooEvents((previous: any) => [...previous, value]);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("submissionPayloadResponse", handleFooEvent);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("submissionPayloadResponse", handleFooEvent);
    };
  }, [user]); // Add user to dependency array

  console.log(problem);

  if (!problem) return null;

  return (
    <>
      <ConnectionManager />
      <Navbar />
      <Description
        descriptionText={problem.description}
        testCases={problem.testCases}
      />
      <Sidebar />
    </>
  );
}

export default App;
