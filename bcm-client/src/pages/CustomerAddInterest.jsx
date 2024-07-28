//import the useQuery hook from @apollo/client
import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
//Importing the global context related files.
import { useGlobalAppContext } from "../utils/GlobalAppContext";
import "react-toastify/dist/ReactToastify.min.css";
import { Grid, GridItem, Box } from "@chakra-ui/react";
import SideBar from "../components/SideBar";
import { ADD_INTEREST } from "../utils/mutations";
import { QUERY_CUSTOMER_PRODUCTS } from "../utils/queries";
import { useNavigate } from "react-router-dom";

const CustomerAddInterest = () => {
  // Extracting the context details
  const [state, dispatch] = useGlobalAppContext();
  console.log(state);
  const [interestFormState, setInterestFormState] = useState({
    selectedProducts: [],
  });
  const navigate = useNavigate();
  const { loading, data: customerProducts } = useQuery(QUERY_CUSTOMER_PRODUCTS);

  const [addInterest, { error }] = useMutation(ADD_INTEREST);

  const eligibleProducts = customerProducts?.customersProducts.products || [];

  const handleSubmit = async (event) => {
    // Prevent the browser from reloading the page
    event.preventDefault();
    // Read the form data

    const data = await addInterest({
      variables: {
        products: [...interestFormState.selectedProducts],
        isCustomerInterested: "true",
      },
    });
    console.log(data);
    setInterestFormState({
      ...interestFormState,
      selectedProducts: [],
    });
    // set the if user added interest the global context

    navigate("/customerhome");
  };

  const handleChange = (event) => {
    const options = [...event.target.selectedOptions];
    const values = options.map((option) => option.value);
    console.log(values);
    setInterestFormState({
      ...interestFormState,
      selectedProducts: [...values],
    });
  };

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
              <form method="post" onSubmit={handleSubmit}>
                <label>
                  Select the interested products:
                  <select
                    name="selectedProducts"
                    multiple={true}
                    value={interestFormState.selectedProducts}
                    onChange={handleChange}
                  >
                    {eligibleProducts &&
                      eligibleProducts.map((product) => (
                        <option key={product._id} value={product._id}>
                          {product.productName}
                        </option>
                      ))}
                  </select>
                </label>
                <hr />

                <button id="submitI" type="submit">
                  Submit
                </button>
              </form>
            </Box>
          </>
        </GridItem>
      </Grid>
    </>
  );
};

export default CustomerAddInterest;
