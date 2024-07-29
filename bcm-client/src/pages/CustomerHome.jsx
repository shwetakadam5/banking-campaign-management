//import the useQuery hook from @apollo/client
import { useQuery, useMutation } from "@apollo/client";
import { useState, useEffect } from "react";

//Importing the global context related files.
import { useGlobalAppContext } from "../utils/GlobalAppContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import { MultiSelect } from "react-multi-select-component";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Divider,
  Text,
  HStack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import {
  CheckCircleIcon,
  InfoIcon,
  PhoneIcon,
  PlusSquareIcon,
} from "@chakra-ui/icons";
import SideBar from "../components/SideBar";

import { QUERY_CUSTOMER_PRODUCTS } from "../utils/queries";
import { ADD_INTEREST } from "../utils/mutations";

const CustomerHome = () => {
  // Extracting the context details
  const [state, dispatch] = useGlobalAppContext();
  const [showAlert, setShowAlert] = useState(false);
  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: true });

  console.log(state);
  const [addInterestFormState, setAddInterestFormState] = useState({
    selectedProducts: [],
  });

  const { loading, data } = useQuery(QUERY_CUSTOMER_PRODUCTS);

  const [addInterest, { error }] = useMutation(ADD_INTEREST, {
    refetchQueries: [QUERY_CUSTOMER_PRODUCTS, "getCustomersProducts"],
  });

  const products = data?.customersProducts.products || [];
  const interestedProducts =
    data?.customersProducts.interestedProducts?.products || [];

  console.log(interestedProducts);

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
    setShowAlert(true);

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
          <SimpleGrid spacing={10} minChildWidth={"250px"}>
            {products &&
              products.map((product) => (
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
                  <CardFooter>
                    <HStack>
                      <PlusSquareIcon h={"20px"} />
                      <Text>Offered</Text>
                    </HStack>
                  </CardFooter>
                </Card>
              ))}
          </SimpleGrid>
          <Box w="340px" mt="15px" mb="15px">
            <form onSubmit={handleSubmit}>
              <fieldset
                disabled={
                  interestedProducts && interestedProducts.length != 0
                    ? true
                    : false
                }
              >
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
                  <Button colorScheme="blue" type="submit">
                    Submit
                  </Button>
                </FormControl>
              </fieldset>
            </form>
          </Box>

          <SimpleGrid spacing={10} minChildWidth={"250px"}>
            {interestedProducts &&
              interestedProducts.map((product) => (
                <>
                  <Card
                    key={product._id}
                    borderTop="8px"
                    borderBottom="1px"
                    borderLeft="1px"
                    borderRight="1px"
                    borderColor="green.400"
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
                    <CardFooter>
                      <HStack>
                        <CheckCircleIcon h={"20px"} />
                        <Text>Interested</Text>
                      </HStack>
                    </CardFooter>
                  </Card>
                </>
              ))}
          </SimpleGrid>
        </GridItem>
      </Grid>
    </>
  );
};

export default CustomerHome;
