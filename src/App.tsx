import "./App.css";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import SampleProblem1 from "./constant/SampleProblem1";
import Description from "./pages/Description/Description";

function App() {
  return (
    <>
      <Navbar />
      <Description descriptionText={SampleProblem1.problemStatement} />
      <Sidebar />
    </>
  );
}

export default App;
