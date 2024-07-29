//import the useQuery hook from @apollo/client
import { useQuery, useMutation } from "@apollo/client";
import { useState, useEffect } from "react";

//Importing the global context related files.
import { useGlobalAppContext } from "../utils/GlobalAppContext";
import "react-toastify/dist/ReactToastify.min.css";

import SideBar from "../components/SideBar";
import { ADD_INTEREST } from "../utils/mutations";
import { QUERY_CUSTOMER_PRODUCTS } from "../utils/queries";
import { useNavigate } from "react-router-dom";
import { MultiSelect } from "react-multi-select-component";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
} from "@chakra-ui/react";

const CustomerAddInterest = () => {
  // Extracting the context details
  const [state, dispatch] = useGlobalAppContext();
  console.log(state);

  const [addInterestFormState, setAddInterestFormState] = useState({
    selectedProducts: [],
  });

  const { loading, data } = useQuery(QUERY_CUSTOMER_PRODUCTS);

  const [addInterest, { error }] = useMutation(ADD_INTEREST, {
    refetchQueries: [QUERY_CUSTOMER_PRODUCTS, "getCustomersProducts"],
  });

  const products = data?.customersProducts.products || [];

  const handleSubmit = async (event) => {
    // Prevent the browser from reloading the page
    event.preventDefault();
    // Read the form data

    const data = await addInterest({
      variables: {
        products: addInterestFormState.selectedProducts.map(
          (product) => product.value
        ),

        isCustomerInterested: "true",
      },
    });
    console.log(data);

    //navigate("/customerhome");
  };

  useEffect(() => {
    const product = data?.product;

    if (!product) return;
    console.log("inside useEffect", product);

    setAddInterestFormState((state) => ({
      ...state,
      selectedProducts: product.map((element) => {
        return { value: element._id, label: element.productName };
      }),
    }));
  }, [data]);

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
            <Box maxW="480px">
              <form onSubmit={handleSubmit}>
                <FormControl mb="15px">
                  <FormLabel htmlFor="interestedProducts">
                    Choose Interested Product
                  </FormLabel>
                  <MultiSelect
                    labelledBy="interestedProducts"
                    className="interestedProducts"
                    options={
                      products &&
                      products.map((product) => ({
                        value: product._id,
                        label: product.productName,
                      }))
                    }
                    onChange={(changeValue) => {
                      console.log(changeValue);
                      setAddInterestFormState((state) => ({
                        ...state,
                        selectedProducts: changeValue,
                      }));
                    }}
                    value={addInterestFormState.selectedProducts}
                  ></MultiSelect>
                </FormControl>
                <FormControl mb="15px">
                  <Button type="submit">Submit</Button>
                </FormControl>
              </form>
            </Box>
          </>
        </GridItem>
      </Grid>
    </>
  );
};

export default CustomerAddInterest;
