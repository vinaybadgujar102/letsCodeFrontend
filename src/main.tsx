import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.tsx";
import AddProblem from "./pages/AddProblem.tsx";
import ProblemList from "./pages/ProblemList.tsx";
import LandingPage from "./pages/LandingPage.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import Login from "./components/Auth/Login.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
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
    </AuthProvider>
  </React.StrictMode>
);
