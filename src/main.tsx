import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.tsx";
import AddProblem from "./pages/AddProblem.tsx";
import ProblemList from "./pages/ProblemList.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProblemList />,
  },
  {
    path: "/problem/:id",
    element: <App />,
  },
  {
    path: "/addProblem",
    element: <AddProblem />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
