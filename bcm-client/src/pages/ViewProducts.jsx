//import the useQuery hook from @apollo/client
import { useQuery } from "@apollo/client";

//Importing the global context related files.
import { useGlobalAppContext } from "../utils/GlobalAppContext";

import "react-toastify/dist/ReactToastify.min.css";

import { useEffect } from "react";
import SideBar from "../components/SideBar";

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
  SimpleGrid,
  Text,
  Heading,
  HStack,
  Button,
  Divider,
  Checkbox,
  Spacer,
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  TableCaption,
  StepSeparator,
} from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";

const ViewProducts = () => {
  // Extracting the context details
  const [state, dispatch] = useGlobalAppContext();

  const { productName } = state;
  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const products = data?.products || [];

  console.log(products);

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
          <TableContainer>
            <Table
              size="sm"
              variant="striped"
              colorScheme="blue"
              border={"1px solid"}
            >
              <TableCaption placement="top">Products </TableCaption>
              <Thead bg={"blue.700"}>
                <Tr>
                  <Th color={"aliceblue"}>Product Name</Th>
                  <Th color={"aliceblue"}>Product Type</Th>
                  <Th color={"aliceblue"}>Product Description</Th>
                  <Th color={"aliceblue"}># Rules</Th>
                  <Th color={"aliceblue"}>Rule names</Th>
                </Tr>
              </Thead>
              <Tbody>
                {products &&
                  products.map((product) => (
                    <Tr key={product._id}>
                      <Td>{product.productName}</Td>
                      <Td>{product.productName} </Td>
                      <Td>{product.productName} </Td>
                      <Td>{product.applicableRulesCount}</Td>
                      <Td>{product.allRuleNames}</Td>
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
