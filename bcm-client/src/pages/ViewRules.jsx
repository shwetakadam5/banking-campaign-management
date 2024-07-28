//import the useQuery hook from @apollo/client
import { useQuery } from "@apollo/client";

//Importing the global context related files.
import { useGlobalAppContext } from "../utils/GlobalAppContext";

import "react-toastify/dist/ReactToastify.min.css";

import { useEffect } from "react";
import SideBar from "../components/SideBar";

import { QUERY_RULES } from "../utils/queries";
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

const ViewRules = () => {
  // Extracting the context details
  const [state, dispatch] = useGlobalAppContext();

  const { loading, data } = useQuery(QUERY_RULES);

  const rules = data?.rules || [];

  console.log(rules);

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
          <TableContainer>
            <Table
              size="sm"
              variant="striped"
              colorScheme="blue"
              border={"1px solid"}
            >
              <TableCaption placement="top">Rules </TableCaption>
              <Thead bg={"blue.700"}>
                <Tr>
                  <Th color={"aliceblue"}>Rule Name</Th>
                  <Th color={"aliceblue"}>Rule Field</Th>
                  <Th color={"aliceblue"}>Rule Operator</Th>
                  <Th color={"aliceblue"}>Rule Value</Th>
                </Tr>
              </Thead>
              <Tbody>
                {rules &&
                  rules.map((rule) => (
                    <Tr key={rule._id}>
                      <Td>{rule.ruleName}</Td>
                      <Td>{rule.ruleOperandField} </Td>
                      <Td>
                        {rule.ruleOperator == ("greater" || "less")
                          ? rule.ruleOperator + " " + "than"
                          : rule.ruleOperator}
                      </Td>
                      <Td>{rule.ruleValue} </Td>
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

export default ViewRules;
