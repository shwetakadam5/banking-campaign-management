//import the useQuery hook from @apollo/client
import { useQuery, useMutation } from "@apollo/client";

//Importing the global context related files.
import { useGlobalAppContext } from "../utils/GlobalAppContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useEffect } from "react";
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Grid,
  GridItem,
  SimpleGrid,
  Text,
  Heading,
  HStack,
  Button,
  Divider,
  Checkbox,
  Spacer,
} from "@chakra-ui/react";
import { CheckCircleIcon, InfoIcon, PlusSquareIcon } from "@chakra-ui/icons";
import SideBar from "../components/SideBar";

import { QUERY_CUSTOMER_PRODUCTS } from "../utils/queries";
import { ADD_INTEREST } from "../utils/mutations";

const CustomerHome = () => {
  // Extracting the context details
  const [state, dispatch] = useGlobalAppContext();
  console.log(state);

  const { loading, data } = useQuery(QUERY_CUSTOMER_PRODUCTS);

  const [addInterest, { error }] = useMutation(ADD_INTEREST);

  const eligibleProducts = data?.customersProducts.products || [];

  useEffect(() => {
    toast.success("Welcome!", {
      autoClose: 2000, // milliseconds
    });
  }, []);

  const showInterest = async (event) => {
    event.preventDefault();
    const { value } = event.target;
    console.log(value);
    try {
      const data = await addInterest({
        variables: { products: [value], isCustomerInterested: "true" },
      });
      console.log(data);
    } catch (err) {
      console.error(err);
    }
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
            <SimpleGrid spacing={10} minChildWidth={"250px"}>
              {eligibleProducts &&
                eligibleProducts.map((product) => (
                  <Card
                    key={product._id}
                    borderTop="8px"
                    borderBottom="1px"
                    borderLeft="1px"
                    borderRight="1px"
                    borderColor="blue.400"
                    bg="white"
                  >
                    <CardHeader>
                      <Flex gap="5">
                        <Box w="50px" h="50px">
                          <Text>AV</Text>
                        </Box>
                        <Box>
                          <Heading as="h3" size="sm">
                            {product.productName}
                          </Heading>
                          <Text>{product.productType}</Text>
                        </Box>
                      </Flex>
                    </CardHeader>
                    <CardBody color="gray.500">
                      <Text>{product.productDescription}</Text>
                    </CardBody>
                    <Divider borderColor="gray.200"></Divider>
                    <CardFooter></CardFooter>
                  </Card>
                ))}
            </SimpleGrid>
          </>
        </GridItem>
      </Grid>
    </>
  );
};

export default CustomerHome;
