import "./App.css";

import Navbar from "./components/Navbar";
import Description from "./pages/Description/Description";

function App() {
  const markdownText =
    " asasddddddddddddddddddddddddddddddddddddddddddddddddasssssssssssssssssssssss";
  return (
    <>
      <Navbar />
      <Description descriptionText={markdownText} />
    </>
  );
}

export default App;
