import "./App.css";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Description from "./pages/Description/Description";

function App() {
  const markdownText =
    " asasddddddddddddddddddddddddddddddddddddddddddddddddasssssssssssssssssssssss";
  return (
    <>
      <Navbar />
      <Sidebar />
      <Description descriptionText={markdownText} />
    </>
  );
}

export default App;
