//import the useQuery hook from @apollo/client
import { useQuery } from "@apollo/client";

//Importing the global context related files.
import { useGlobalAppContext } from "../utils/GlobalAppContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import { useEffect } from "react";

const AgentHome = () => {
  // Extracting the context details
  const [state, dispatch] = useGlobalAppContext();

  useEffect(() => {
    toast.success("Welcome!", {
      autoClose: 2000, // milliseconds
    });
  }, []);

  return (
    <div>
      <ToastContainer />
      <h1>Agent Home </h1>
      <div></div>
    </div>
  );
};

export default AgentHome;
