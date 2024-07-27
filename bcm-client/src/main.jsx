import React from "react";
import ReactDOM from "react-dom/client";
// Adding the required imports from 'react-router-dom' to set up application routing behavior
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import App from "./App.jsx";
import Login from "./pages/Login.jsx";
import AdminHome from "./pages/AdminHome.jsx";
import AgentHome from "./pages/AgentHome.jsx";
import CustomerHome from "./pages/CustomerHome.jsx";

// All the accessible routes, and which components respond to which URL are defined
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    // errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "/adminhome",
        element: <AdminHome />,
      },
      {
        path: "/agenthome",
        element: <AgentHome />,
      },
      {
        path: "/customerhome",
        element: <CustomerHome />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
