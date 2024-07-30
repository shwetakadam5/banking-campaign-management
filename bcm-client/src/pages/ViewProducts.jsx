//import the useQuery hook from @apollo/client
import { useQuery } from "@apollo/client";

//Importing the global context related files.
import { useGlobalAppContext } from "../utils/GlobalAppContext";

import "react-toastify/dist/ReactToastify.min.css";

import SideBar from "../components/SideBar";
import { Link } from "react-router-dom";

import { QUERY_PRODUCTS } from "../utils/queries";
StepSeparator;
import {
  Grid,
  GridItem,
  Table,
  Th,
  Td,
  Tr,
  Tfoot,
  Thead,
  Tbody,
  TableContainer,
  Button,
  Box,
  TableCaption,
  StepSeparator,
} from "@chakra-ui/react";

import { SmallAddIcon, EditIcon } from "@chakra-ui/icons";

const ViewProducts = () => {
  // Extracting the context details
  const [state, dispatch] = useGlobalAppContext();

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const products = data?.products || [];

  return (
    <>
      <Grid templateColumns="repeat(6, 1fr)" bg="blue.50">
        {/* The Outlet component will conditionally swap between the different pages according to the URL */}
        <GridItem
          as="aside"
          colSpan={{ base: 6, md: 3, lg: 2, xl: 1 }}
          bg="blue.200"
          minHeight={{ lg: "100vh" }}
          p={{ base: "20px", lg: "30px" }}
        >
          <SideBar />
        </GridItem>
        <GridItem as="main" colSpan={{ base: 6, md: 3, lg: 4, xl: 5 }} p="40px">
          <Box>
            <Button rightIcon={<SmallAddIcon />} colorScheme="blue">
              <Link to="/createproduct">Add</Link>
            </Button>
          </Box>
          <TableContainer>
            <Table
              size="sm"
              variant="striped"
              colorScheme="blue"
              border={"1px solid"}
            >
              <TableCaption placement="top">Products</TableCaption>
              <Thead bg={"blue.700"}>
                <Tr>
                  <Th color={"aliceblue"}>Product Name</Th>
                  <Th color={"aliceblue"}>Product Type</Th>
                  <Th color={"aliceblue"}>Product Description</Th>
                  <Th color={"aliceblue"}># Rules</Th>
                  <Th color={"aliceblue"}>Rules</Th>
                  <Th color={"aliceblue"}>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {products &&
                  products.map((product) => (
                    <Tr key={product._id}>
                      <Td>{product.productName}</Td>
                      <Td>{product.productType} </Td>
                      <Td>{product.productDescription} </Td>
                      <Td>{product.applicableRulesCount}</Td>
                      <Td>{product.allRuleNames}</Td>
                      <Td>
                        <Link to={`/editproduct/${product._id}`}>
                          {" "}
                          <Button
                            variant={"ghost"}
                            rightIcon={<EditIcon />}
                          ></Button>
                        </Link>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th> </Th>
                  <Th> </Th>
                  <Th> </Th>
                  <Th> </Th>
                  <Th> </Th>
                  <Th></Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </GridItem>
      </Grid>
    </>
  );
};

export default ViewProducts;
