//import the useQuery hook from @apollo/client
import { useQuery } from "@apollo/client";

//Importing the global context related files.
import { useGlobalAppContext } from "../utils/GlobalAppContext";

import "react-toastify/dist/ReactToastify.min.css";

import { useEffect } from "react";
import SideBar from "../components/SideBar";

import { QUERY_CUSTOMERS } from "../utils/queries";
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
} from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";

const AdminHome = () => {
  // Extracting the context details
  const [state, dispatch] = useGlobalAppContext();

  const { loading, data } = useQuery(QUERY_CUSTOMERS);

  const customers = data?.customers || [];

  console.log(customers);

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
              <TableCaption placement="top">Customer Data</TableCaption>
              <Thead bg={"blue.700"}>
                <Tr>
                  <Th color={"aliceblue"}>Customer First Name</Th>
                  <Th color={"aliceblue"}>Customer Last Name</Th>
                  <Th color={"aliceblue"}>Customer Email</Th>
                  <Th color={"aliceblue"}>Customer Eligible</Th>
                  <Th color={"aliceblue"}># Eligible Products</Th>
                  <Th color={"aliceblue"}>Customer Interested</Th>
                  <Th color={"aliceblue"}># Interested Products</Th>
                  <Th color={"aliceblue"}>Customer Created By</Th>
                </Tr>
              </Thead>
              <Tbody>
                {customers &&
                  customers.map((customer) => (
                    <Tr key={customer._id}>
                      <Td>{customer.customerFirstName}</Td>
                      <Td>{customer.customerLastName} </Td>
                      <Td>{customer.customerEmail} </Td>
                      <Td>{customer.isCustomerEligible ? "Yes" : "No"} </Td>
                      <Td>{customer.eligibleProductsCount} </Td>
                      <Td>
                        {customer.interestedProducts?.isCustomerInterested
                          ? "Yes"
                          : "No"}
                      </Td>
                      <Td>
                        {customer.interestedProducts?.interestedProductsCount ||
                          "0"}
                      </Td>
                      <Td>{customer.createdBy?.appUserFullName || ""} </Td>
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

export default AdminHome;
