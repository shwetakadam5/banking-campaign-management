//import the useQuery hook from @apollo/client
import { useQuery, useMutation } from "@apollo/client";

//Importing the global context related files.
import { useGlobalAppContext } from "../utils/GlobalAppContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import { MultiSelect } from "react-multi-select-component";

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

import { ADD_PRODUCT } from "../utils/mutations";
import { QUERY_PRODUCTS, QUERY_RULES } from "../utils/queries";

const AddProduct = () => {
  const navigate = useNavigate();
  // Extracting the context details
  const [state, dispatch] = useGlobalAppContext();
  const [selected, setSelected] = useState([]);

  console.log(selected);

  const [addProductFormState, setAddProductFormState] = useState({
    productName: "",
    productType: "",
    productDescription: "",
    rules: [""],
  });

  const [addProductFormErrors, setAddProductFormErrors] = useState({
    productName: "",
    productType: "",
    productDescription: "",
  });

  const [addProduct, { error }] = useMutation(ADD_PRODUCT, {
    refetchQueries: [QUERY_PRODUCTS, "getProducts", QUERY_RULES, "getRules"],
  });

  const { loading, data: allRules } = useQuery(QUERY_RULES);

  const rules = allRules?.rules || [];
  const handleAddProductFormSubmit = async (event) => {
    event.preventDefault();

    console.log("in submit");
    console.log(Object.values(addProductFormState));
    console.log(Object.values(addProductFormErrors));
    const isFormValid = Object.values(addProductFormErrors).every(
      (error) => error === ""
    );
    if (isFormValid) {
      console.log("Successfully Submit");
      const productCreated = await addProduct({
        variables: {
          productName: addProductFormState.productName,
          productType: addProductFormState.productType,
          productDescription: addProductFormState.productDescription,
          rules: selected.map((ruleId) => ruleId.value),
        },
      });
      console.log(productCreated);
      navigate("/viewproducts");
    } else {
      console.log("Form contains validation errors.");
      navigate("/createproduct");
    }
  };
  const handleAddProductFormChange = (event) => {
    const { name, value } = event.target;
    console.log(name);
    console.log(value);

    if (name === "productName" && value.trim().length < 3) {
      setAddProductFormErrors((addProductFormErrors) => ({
        ...addProductFormErrors,
        productName: "Product Name must be at least 3 characters long.",
      }));
    } else if (name === "productDescription" && value.trim().length < 3) {
      setAddProductFormErrors((addProductFormErrors) => ({
        ...addProductFormErrors,
        productDescription:
          "Product Description must be at least 3 characters long.",
      }));
    } else {
      setAddProductFormErrors((addProductFormErrors) => ({
        ...addProductFormErrors,
        [name]: "", // Reset error message,
      }));
    }

    if (
      name === "productName" ||
      name === "productType" ||
      name === "productDescription"
    ) {
      setAddProductFormState({ ...addProductFormState, [name]: value });
    }
    // else if (event.target.selectedOptions) {
    //   const options = [...event.target.selectedOptions];
    //   const values = options.map((option) => option.value);

    //   console.log(values);
    //   setAddProductFormState({
    //     ...addProductFormState,
    //     rules: [...values],
    //   });
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
          <Box maxW="480px">
            <Heading as="h6"> Add Product </Heading>
            {error && <Text color={"red.500"}>{"Something went wrong"}</Text>}

            <form onSubmit={handleAddProductFormSubmit}>
              <ToastContainer />
              <FormControl isRequired mb="15px">
                <FormLabel htmlFor="productName">Product Name</FormLabel>
                <Input
                  placeholder="productName"
                  name="productName"
                  type="input"
                  id="productName"
                  onChange={handleAddProductFormChange}
                />
                {addProductFormErrors.productName && (
                  <FormHelperText color={"red.500"}>
                    {addProductFormErrors.productName}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl isRequired mb="15px">
                <FormLabel htmlFor="productType">Product Type</FormLabel>
                {/* <Input
                  placeholder="productType"
                  name="productType"
                  type="input"
                  id="productType"
                  onChange={handleAddProductFormChange}
                /> */}

                <Select
                  placeholder="Select product type"
                  onChange={handleAddProductFormChange}
                  name="productType"
                >
                  <option name="productType" value="TXNACCT">
                    Transaction Account
                  </option>
                  <option name="productType" value="SAVACCT">
                    Saving Account
                  </option>
                  <option name="productType" value="CCARD">
                    Credit Card
                  </option>
                  <option name="productType" value="HLOAN">
                    Home Loan
                  </option>
                  <option name="productType" value="PLOAN">
                    Personal Loan
                  </option>
                </Select>
              </FormControl>

              <FormControl isRequired mb="15px">
                <FormLabel htmlFor="productDescription">
                  Product Description
                </FormLabel>
                <Input
                  placeholder="productDescription"
                  name="productDescription"
                  type="input"
                  id="productDescription"
                  onChange={handleAddProductFormChange}
                />
                {addProductFormErrors.productDescription && (
                  <FormHelperText color={"red.500"}>
                    {addProductFormErrors.productDescription}
                  </FormHelperText>
                )}
              </FormControl>

              {/* <FormControl isRequired mb="15px">
                <FormLabel htmlFor="rules">Rules</FormLabel>
                <Select
                  variant="outline"
                  placeholder="Select operator"
                  onChange={handleAddProductFormChange}
                  name="rules"
                  multiple={true}
                >
                  {rules &&
                    rules.map((rule) => (
                      <option key={rule._id} value={rule._id}>
                        {rule.ruleName}
                      </option>
                    ))}
                </Select>
              </FormControl> */}
              {/* <FormControl isRequired mb="15px">
                <FormLabel htmlFor="ruleName">Rule Value</FormLabel>
                <select
                  id="my-select-1"
                  name="rulesTry"
                  multiple={true}
                  value={rules}
                  onChange={handleAddProductFormChange}
                >
                  {rules &&
                    rules.map((rule) => (
                      {value :{rule._id}
                        label : {rule.ruleName}
}
                    ))}
                </select>
              </FormControl> */}

              <FormControl mb="15px">
                <FormLabel htmlFor="ruleName">Rule Value</FormLabel>
                <MultiSelect
                  labelledBy="rules"
                  className="rules"
                  options={
                    rules &&
                    rules.map((rule) => ({
                      value: rule._id,
                      label: rule.ruleName,
                    }))
                  }
                  onChange={setSelected}
                  value={selected}
                ></MultiSelect>
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

export default AddProduct;
