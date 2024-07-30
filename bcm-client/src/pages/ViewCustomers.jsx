//import the useQuery hook from @apollo/client
import { useQuery } from "@apollo/client";

//Importing the global context related files.
import { useGlobalAppContext } from "../utils/GlobalAppContext";

import { useEffect } from "react";
import SideBar from "../components/SideBar";

import { QUERY_CUSTOMERS_BY_AGENT } from "../utils/queries";
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
  TableCaption,
} from "@chakra-ui/react";

const ViewCustomers = () => {
  // Extracting the context details
  const [state, dispatch] = useGlobalAppContext();

  const { loading, data } = useQuery(QUERY_CUSTOMERS_BY_AGENT);

  const customers = data?.customersByAgent || [];

  console.log(customers);

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
          <TableContainer>
            <Table
              size="md"
              variant="striped"
              colorScheme="blue"
              border={"1px solid"}
            >
              <TableCaption placement="top">
                My Customer Information
              </TableCaption>
              <Thead bg={"blue.700"}>
                <Tr>
                  <Th color={"aliceblue"}>Customer First Name</Th>
                  <Th color={"aliceblue"}>Customer Last Name</Th>
                  <Th color={"aliceblue"}>Customer Email</Th>
                  <Th color={"aliceblue"}>Customer Eligible</Th>
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
                    </Tr>
                  ))}
              </Tbody>
              <Tfoot>
                <Tr>
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

export default ViewCustomers;
