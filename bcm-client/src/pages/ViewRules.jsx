//import the useQuery hook from @apollo/client
import { useQuery, useMutation } from "@apollo/client";

//Importing the global context related files.
import { useGlobalAppContext } from "../utils/GlobalAppContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import { useEffect, useRef, useState } from "react";

import SideBar from "../components/SideBar";
import { Link } from "react-router-dom";

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
  TableCaption,
  Button,
  Box,
  Text,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialogHeader,
} from "@chakra-ui/react";
import { SmallAddIcon, DeleteIcon } from "@chakra-ui/icons";
import { DELETE_RULE } from "../utils/mutations";

const ViewRules = () => {
  // Extracting the context details
  const [state, dispatch] = useGlobalAppContext();

  const [rule, setRule] = useState({ ruleId: "", ruleName: "" });
  const { loading, data } = useQuery(QUERY_RULES);

  const [deleteRule, { error: deleteError }] = useMutation(DELETE_RULE, {
    refetchQueries: [QUERY_RULES, "getRules"],
  });

  const rules = data?.rules || [];

  console.log(rules);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const handleDelete = async () => {
    // const confirm = window.confirm("Would you like to delete?");

    // if (confirm) {
    const { data, deleteError } = await deleteRule({
      variables: {
        ruleId: rule.ruleId,
      },
    });
    // }
  };

  return (
    <>
      <Grid templateColumns="repeat(6, 1fr)" bg="blue.50">
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
              <Link to="/createrule">Add</Link>
            </Button>
          </Box>
          {deleteError && (
            <Text color={"red.500"}>
              {"Rule is linked to product and cannot be deleted."}
            </Text>
          )}

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
                  <Th color={"aliceblue"}>Action</Th>
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
                      <Td>
                        <Button
                          variant={"ghost"}
                          rightIcon={<DeleteIcon />}
                          onClick={() => {
                            setRule({
                              ruleId: rule._id,
                              ruleName: rule.ruleName,
                            });
                            onOpen();
                          }}
                        ></Button>
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
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </GridItem>
      </Grid>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Rule
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete the {rule.ruleName}? You can't
              undo this action afterwards.
              <Text fontStyle={"italic"} color={"red"} fontSize="small">
                Note : Rule cannot be deleted if linked to a product.
              </Text>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  handleDelete();
                  onClose();
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default ViewRules;
