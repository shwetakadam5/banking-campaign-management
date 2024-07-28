//import the useQuery hook from @apollo/client
import { useMutation } from "@apollo/client";

//Importing the global context related files.
import { useGlobalAppContext } from "../utils/GlobalAppContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

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
} from "@chakra-ui/react";
import { ADD_CUSTOMER } from "../utils/mutations";

const AgentHome = () => {
  const navigate = useNavigate();
  // Extracting the context details

  const [state, dispatch] = useGlobalAppContext();
  const dateInputRef = useRef(null);

  const [addCustomerFormState, setAddCustomerFormState] = useState({
    customerFirstName: "",
    customerLastName: "",
    customerEmail: "",
    customerGender: "",
    customerOccupation: "",
    customerSalary: "",
    customerResidentStatus: "",
    customerDateOfBirth: "",
  });

  const [addCustomerFormErrors, setAddCustomerFormErrors] = useState({
    customerFirstName: "",
    customerLastName: "",
    customerEmail: "",
    customerGender: "",
    customerOccupation: "",
    customerSalary: "",
    customerResidentStatus: "",
    customerDateOfBirth: "",
  });

  const [addCustomer, { error }] = useMutation(ADD_CUSTOMER);

  const handleAddCustomerFormSubmit = async (event) => {
    event.preventDefault();

    console.log("in submit");
    console.log(Object.values(addCustomerFormState));
    console.log(Object.values(addCustomerFormErrors));
    const isFormValid = Object.values(addCustomerFormErrors).every(
      (error) => error === ""
    );
    if (isFormValid) {
      console.log("Successfully Submit");
      const customerCreated = await addCustomer({
        variables: {
          customerFirstName: addCustomerFormState.customerFirstName,
          customerLastName: addCustomerFormState.customerLastName,
          customerEmail: addCustomerFormState.customerEmail,
          customerGender: addCustomerFormState.customerGender,
          customerOccupation: addCustomerFormState.customerOccupation,
          customerSalary: parseInt(addCustomerFormState.customerSalary),
          customerResidentStatus: addCustomerFormState.customerResidentStatus,
          customerDateOfBirth: addCustomerFormState.customerDateOfBirth,
        },
      });
      console.log(customerCreated);
      toast.success("Customer Created Successfully", {
        autoClose: 2000, // milliseconds
      });
      setAddCustomerFormState({
        ...addCustomerFormState,
        customerFirstName: " ",
      });
    } else {
      console.log("Form contains validation errors.");
      toast.error("Form contains validation errors.", {
        autoClose: 2000, // milliseconds
      });
    }
  };

  const handleAddCustomerFormChange = (event) => {
    const { name, value } = event.target;
    console.log(name);

    if (name === "customerFirstName" && value.trim().length < 3) {
      setAddCustomerFormErrors((addCustomerFormErrors) => ({
        ...addCustomerFormErrors,
        customerFirstName: "First Name must be at least 3 characters long.",
      }));
    } else if (name === "customerLastName" && value.trim().length < 1) {
      setAddCustomerFormErrors((addCustomerFormErrors) => ({
        ...addCustomerFormErrors,
        customerLastName: "Last Name must be at least 1 character long.",
      }));
    } else if (name === "customerDateOfBirth") {
      let dateString = value;
      console.log(dateString);
      let customerDOB = new Date(value);
      console.log(customerDOB);
      let currentDate = new Date();
      console.log(currentDate);
      if (customerDOB > currentDate) {
        setAddCustomerFormErrors((addCustomerFormErrors) => ({
          ...addCustomerFormErrors,
          customerDateOfBirth: "Date of birth cannot be a future date.",
        }));
      } else {
        setAddCustomerFormErrors((addCustomerFormErrors) => ({
          ...addCustomerFormErrors,
          customerDateOfBirth: "",
        }));
      }
    } else if (name === "customerSalary") {
      if (!(!isNaN(value) && Number.isInteger(parseFloat(value)))) {
        setAddCustomerFormErrors((addCustomerFormErrors) => ({
          ...addCustomerFormErrors,
          customerSalary: "Salary must be an integer value",
        }));
      } else {
        setAddCustomerFormErrors((addCustomerFormErrors) => ({
          ...addCustomerFormErrors,
          customerSalary: "",
        }));
      }
    } else {
      setAddCustomerFormErrors((addCustomerFormErrors) => ({
        ...addCustomerFormErrors,
        [name]: "", // Reset error message,
      }));
    }
    setAddCustomerFormState({ ...addCustomerFormState, [name]: value });
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
            <Heading as="h6"> Add Customer </Heading>
            <form onSubmit={handleAddCustomerFormSubmit}>
              <ToastContainer />
              <FormControl isRequired mb="15px">
                <FormLabel htmlFor="customerFirstName">First Name</FormLabel>
                <Input
                  placeholder="firstname"
                  name="customerFirstName"
                  type="input"
                  id="customerFirstName"
                  onChange={handleAddCustomerFormChange}
                />
                {addCustomerFormErrors.customerFirstName && (
                  <FormHelperText color={"red.500"}>
                    {addCustomerFormErrors.customerFirstName}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl isRequired mb="15px">
                <FormLabel htmlFor="customerLastName">Last Name</FormLabel>

                <Input
                  placeholder="lastname"
                  name="customerLastName"
                  type="input"
                  id="customerLastName"
                  onChange={handleAddCustomerFormChange}
                />
                {addCustomerFormErrors.customerLastName && (
                  <FormHelperText color={"red.500"}>
                    {addCustomerFormErrors.customerLastName}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl isRequired mb="15px">
                <FormLabel htmlFor="customerDateOfBirth">
                  Date of Birth
                </FormLabel>
                <Input
                  placeholder=""
                  name="customerDateOfBirth"
                  type="date"
                  id="customerDateOfBirth"
                  onChange={handleAddCustomerFormChange}
                  ref={dateInputRef}
                />
                {addCustomerFormErrors.customerDateOfBirth && (
                  <FormHelperText color={"red.500"}>
                    {addCustomerFormErrors.customerDateOfBirth}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl isRequired mb="15px">
                <FormLabel htmlFor="customerEmail">Email address:</FormLabel>
                <Input
                  placeholder="youremail@test.com"
                  name="customerEmail"
                  type="email"
                  id="customerEmail"
                  onChange={handleAddCustomerFormChange}
                />
                {addCustomerFormErrors.customerEmail && (
                  <FormHelperText color={"red.500"}>
                    {addCustomerFormErrors.customerEmail}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl isRequired mb="15px">
                <FormLabel htmlFor="customerGender">Gender</FormLabel>

                <Select
                  placeholder="Select gender"
                  onChange={handleAddCustomerFormChange}
                  name="customerGender"
                >
                  <option name="customerGender" value="female">
                    Female
                  </option>
                  <option name="customerGender" value="male">
                    Male
                  </option>
                  <option name="customerGender" value="others">
                    Others
                  </option>
                </Select>
              </FormControl>
              <FormControl mb="15px">
                <FormLabel htmlFor="customerOccupation">Occupation</FormLabel>
                <Input
                  placeholder="occupation"
                  name="customerOccupation"
                  type="input"
                  id="customerOccupation"
                  onChange={handleAddCustomerFormChange}
                />
              </FormControl>
              <FormControl isRequired mb="15px">
                <FormLabel htmlFor="customerResidentStatus">
                  Resident Status
                </FormLabel>
                <Select
                  placeholder="Select resident status"
                  onChange={handleAddCustomerFormChange}
                  name="customerResidentStatus"
                >
                  <option name="customerResidentStatus" value="PR">
                    Permanent Resident
                  </option>
                  <option name="customerResidentStatus" value="CITIZEN">
                    Citizen
                  </option>
                  <option name="customerResidentStatus" value="WORKVISA">
                    Work Visa
                  </option>
                  <option name="customerResidentStatus" value="VISITORVISA">
                    Visitor Visa
                  </option>
                  <option name="customerResidentStatus" value="STUDENTVISA">
                    Student Visa
                  </option>
                </Select>
              </FormControl>
              <FormControl isRequired mb="15px">
                <FormLabel htmlFor="customerSalary">Salary</FormLabel>
                <Input
                  placeholder=""
                  name="customerSalary"
                  type="input"
                  id="customerSalary"
                  onChange={handleAddCustomerFormChange}
                />
                {addCustomerFormErrors.customerSalary && (
                  <FormHelperText color={"red.500"}>
                    {addCustomerFormErrors.customerSalary}
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

export default AgentHome;
