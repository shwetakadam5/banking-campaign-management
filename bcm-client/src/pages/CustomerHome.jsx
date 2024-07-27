//import the useQuery hook from @apollo/client
import { useQuery } from "@apollo/client";

//Importing the global context related files.
import { useGlobalAppContext } from "../utils/GlobalAppContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import { Box, Grid, GridItem, SimpleGrid, Text } from "@chakra-ui/react";

import SideBar from "../components/SideBar";

import { useEffect } from "react";
import { QUERY_CUSTOMER_PRODUCTS } from "../utils/queries";

const CustomerHome = () => {
  // Extracting the context details
  const [state, dispatch] = useGlobalAppContext();

  const { loading, data } = useQuery(QUERY_CUSTOMER_PRODUCTS);

  const products = data?.customersProducts.products || [];

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
          <>
            <SimpleGrid spacing={10} minChildWidth="300px">
              <div>
                {products &&
                  products.map((product) => (
                    <div key={product._id}>{product.productName}</div>
                  ))}
              </div>
            </SimpleGrid>
          </>
        </GridItem>
      </Grid>
    </>
  );
};

export default CustomerHome;
