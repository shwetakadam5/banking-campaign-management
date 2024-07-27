//import the useQuery hook from @apollo/client
import { useQuery } from "@apollo/client";

//Importing the global context related files.
import { useGlobalAppContext } from "../utils/GlobalAppContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import { useEffect } from "react";
import SideBar from "../components/SideBar";

import { Grid, GridItem } from "@chakra-ui/react";

const AgentHome = () => {
  // Extracting the context details
  const [state, dispatch] = useGlobalAppContext();

  useEffect(() => {
    toast.success("Welcome!", {
      autoClose: 2000, // milliseconds
    });
  }, []);

  return (
    <>
      <Grid templateColumns="repeat(6, 1fr)" bg="blue.50">
        {/* The Outlet component will conditionally swap between the different pages according to the URL */}
        <GridItem
          as="aside"
          colSpan={{ base: 6, md: 3, lg: 2, xl: 1 }}
          bg="blue.400"
          minHeight={{ lg: "100vh" }}
          p={{ base: "20px", lg: "30px" }}
        >
          <SideBar />
        </GridItem>
        <GridItem as="main" colSpan={{ base: 6, md: 3, lg: 4, xl: 5 }} p="40px">
          <div>AGENT HOME PAGE</div>
        </GridItem>
      </Grid>
    </>
  );
};

export default AgentHome;
