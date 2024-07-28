//import the useQuery hook from @apollo/client
import { useMutation } from "@apollo/client";

//Importing the global context related files.
import { useGlobalAppContext } from "../utils/GlobalAppContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";

import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";

import { ADD_RULE } from "../utils/mutations";
import { QUERY_RULES } from "../utils/queries";

const AddRule = () => {
  const navigate = useNavigate();
  // Extracting the context details
  const [state, dispatch] = useGlobalAppContext();

  const [addRuleFormState, setAddRuleFormState] = useState({
    ruleName: "",
    ruleOperandField: "",
    ruleOperator: "",
    ruleValue: "",
  });

  const [addRuleFormErrors, setAddRuleFormErrors] = useState({
    ruleName: "",
    ruleOperandField: "",
    ruleOperator: "",
    ruleValue: "",
  });

  const [addRule, { error }] = useMutation(ADD_RULE, {
    refetchQueries: [QUERY_RULES, "getRules"],
  });

  const handleAddRuleFormSubmit = async (event) => {
    event.preventDefault();

    console.log("in submit");
    console.log(Object.values(addRuleFormState));
    console.log(Object.values(addRuleFormErrors));
    const isFormValid = Object.values(addRuleFormErrors).every(
      (error) => error === ""
    );
    if (isFormValid) {
      console.log("Successfully Submit");
      const ruleCreated = await addRule({
        variables: {
          ruleName: addRuleFormState.ruleName,
          ruleOperandField: addRuleFormState.ruleOperandField,
          ruleOperator: addRuleFormState.ruleOperator,
          ruleValue: addRuleFormState.ruleValue,
        },
      });
      console.log(ruleCreated);
      navigate("/viewrules");
    } else {
      console.log("Form contains validation errors.");
      navigate("/createrule");
    }
  };
  const handleAddRuleFormChange = (event) => {
    const { name, value } = event.target;
    console.log(name);

    if (name === "ruleName" && value.trim().length < 3) {
      setAddRuleFormErrors((addRuleFormErrors) => ({
        ...addRuleFormErrors,
        ruleName: "Rule Name must be at least 3 characters long.",
      }));
    } else {
      setAddRuleFormErrors((addRuleFormErrors) => ({
        ...addRuleFormErrors,
        [name]: "", // Reset error message,
      }));
    }
    setAddRuleFormState({ ...addRuleFormState, [name]: value });
  };

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
          <Box maxW="480px">
            <Heading as="h6"> Add Rule </Heading>
            {error && <Text color={"red.500"}>{"Something went wrong"}</Text>}

            <form onSubmit={handleAddRuleFormSubmit}>
              <ToastContainer />
              <FormControl isRequired mb="15px">
                <FormLabel htmlFor="ruleName">Rule Name</FormLabel>
                <Input
                  placeholder="rulename"
                  name="ruleName"
                  type="input"
                  id="ruleName"
                  onChange={handleAddRuleFormChange}
                />
                {addRuleFormErrors.ruleName && (
                  <FormHelperText color={"red.500"}>
                    {addRuleFormErrors.ruleName}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl isRequired mb="15px">
                <FormLabel htmlFor="ruleName">Rule Field Name</FormLabel>

                <Select
                  placeholder="Select field name"
                  onChange={handleAddRuleFormChange}
                  name="ruleOperandField"
                >
                  <option name="ruleOperandField" value="customerFirstName">
                    Customer First Name
                  </option>
                  <option name="ruleOperandField" value="customerLastName">
                    Customer Last Name
                  </option>
                  <option name="ruleOperandField" value="customerEmail">
                    Customer Email
                  </option>
                  <option name="ruleOperandField" value="customerGender">
                    Customer Gender
                  </option>
                  <option name="ruleOperandField" value="customerOccupation">
                    Customer Occupation
                  </option>
                  <option name="ruleOperandField" value="customerSalary">
                    Customer Salary
                  </option>
                  <option
                    name="ruleOperandField"
                    value="customerResidentStatus"
                  >
                    Customer Resident Status
                  </option>
                  <option name="ruleOperandField" value="customerDateOfBirth">
                    Customer Date Of Birth
                  </option>
                  <option name="ruleOperandField" value="customerAge">
                    Customer Age
                  </option>
                </Select>
              </FormControl>

              <FormControl isRequired mb="15px">
                <FormLabel htmlFor="ruleName">Rule Operator</FormLabel>
                <Select
                  placeholder="Select operator"
                  onChange={handleAddRuleFormChange}
                  name="ruleOperator"
                >
                  <option name="ruleOperator" value="greater">
                    Greater than
                  </option>
                  <option name="ruleOperator" value="equals">
                    Equals
                  </option>
                  <option name="ruleOperator" value="less">
                    Less than
                  </option>
                </Select>
              </FormControl>
              <FormControl isRequired mb="15px">
                <FormLabel htmlFor="ruleName">Rule Value</FormLabel>
                <Input
                  placeholder="ruleValue"
                  name="ruleValue"
                  type="input"
                  id="ruleValue"
                  onChange={handleAddRuleFormChange}
                />
                {addRuleFormErrors.ruleValue && (
                  <FormHelperText color={"red.500"}>
                    {addRuleFormErrors.ruleValue}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl mb="15px">
                <Button type="submit">Submit</Button>
              </FormControl>
            </form>
          </Box>
        </GridItem>
      </Grid>
    </>
  );
};

export default AddRule;
