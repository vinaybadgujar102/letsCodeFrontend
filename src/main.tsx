import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import App from "./App.tsx";
import Login from "./components/Auth/Login.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import AddProblem from "./pages/AddProblem.tsx";
import LandingPage from "./pages/LandingPage.tsx";
import Privacy from "./pages/Privacy.tsx";
import ProblemList from "./pages/ProblemList.tsx";
import Terms from "./pages/Terms.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/privacy",
    element: <Privacy />,
  },
  {
    path: "/terms",
    element: <Terms />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/problems",
    element: (
      <ProtectedRoute>
        <ProblemList />
      </ProtectedRoute>
    ),
  },
  {
    path: "/problem/:id",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
  },
  {
    path: "/addProblem",
    element: (
      <ProtectedRoute>
        <AddProblem />
      </ProtectedRoute>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={3000} />
    </AuthProvider>
  </React.StrictMode>
);
