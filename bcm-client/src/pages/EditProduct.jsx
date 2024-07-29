//import the useQuery hook from @apollo/client
import { useQuery, useMutation } from "@apollo/client";

//Importing the global context related files.
import { useGlobalAppContext } from "../utils/GlobalAppContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

import { ADD_PRODUCT, UPDATE_PRODUCT } from "../utils/mutations";
import {
  QUERY_PRODUCT_BY_ID,
  QUERY_PRODUCTS,
  QUERY_RULES,
} from "../utils/queries";

const EditProduct = () => {
  const navigate = useNavigate();
  // Extracting the context details
  const [state, dispatch] = useGlobalAppContext();

  const [selected, setSelected] = useState([
    { value: "66a713a909d6cc5f37c1c353", label: "ageRule1" },
  ]);

  const [updateFormState, setUpdateFormState] = useState({
    productName: "",
    productType: "",
    productDescription: "",
    rules: [""],
  });

  const [updateFormErrors, setUpdateFormErrors] = useState({
    productName: "",
    productType: "",
    productDescription: "",
    // rules: [""],
  });

  // Use `useParams()` to retrieve value of the route parameter `:productId`
  const { productId } = useParams();

  console.log(productId);

  const { loading: productLoading, data } = useQuery(QUERY_PRODUCT_BY_ID, {
    // pass URL parameter
    variables: { id: productId },
  });

  console.log(data);
  const product = data?.product || [];

  const [updateProduct, { error }] = useMutation(UPDATE_PRODUCT, {
    refetchQueries: [QUERY_PRODUCTS, "getProducts", QUERY_RULES, "getRules"],
  });

  const { loading: rulesLoading, data: allRules } = useQuery(QUERY_RULES);

  const rules = allRules?.rules || [];

  useEffect(() => {
    console.log("inside useEffect");
    setUpdateFormState({
      ...updateFormState,
      productName: product.productName,
      productType: product.productType,
      productDescription: product.productDescription,
      rules: product.rules,
    });

    console.log(product.rules);
  }, [data]);

  console.log(updateFormState);

  const handleEditProductFormSubmit = async (event) => {
    event.preventDefault();

    console.log("in submit");
    console.log(Object.values(updateFormState));
    console.log(Object.values(updateFormErrors));
    const isFormValid = Object.values(updateFormErrors).every(
      (error) => error === ""
    );
    if (isFormValid) {
      console.log("Successfully Submit");
      const productUpdated = await updateProduct({
        variables: {
          productId: productId,
          productName: updateFormState.productName,
          productType: updateFormState.productType,
          productDescription: updateFormState.productDescription,
          // rules: updateFormState.rules,
        },
      });
      console.log(productUpdated);
      navigate("/viewproducts");
    } else {
      console.log("Form contains validation errors.");
    }
  };
  const handleEditProductFormChange = (event) => {
    const { name, value } = event.target;
    console.log(name);
    console.log(value);

    if (name === "productName" && value.trim().length < 3) {
      setUpdateFormErrors((updateFormErrors) => ({
        ...updateFormErrors,
        productName: "Product Name must be at least 3 characters long.",
      }));
    } else if (name === "productDescription" && value.trim().length < 3) {
      setUpdateFormErrors((updateFormErrors) => ({
        ...updateFormErrors,
        productDescription:
          "Product Description must be at least 3 characters long.",
      }));
    } else {
      setUpdateFormErrors((updateFormErrors) => ({
        ...updateFormErrors,
        [name]: "", // Reset error message,
      }));
    }

    if (
      name === "productName" ||
      name === "productType" ||
      name === "productDescription"
    ) {
      setUpdateFormState({ ...updateFormState, [name]: value });
    }
    //  else if (event.target.selectedOptions) {
    //   const options = [...event.target.selectedOptions];
    //   const values = options.map((option) => option.value);

    //   console.log(values);
    //   setUpdateFormState({
    //     ...updateFormState,
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
          bg="blue.400"
          minHeight={{ lg: "100vh" }}
          p={{ base: "20px", lg: "30px" }}
        >
          <SideBar />
        </GridItem>
        <GridItem as="main" colSpan={{ base: 6, md: 3, lg: 4, xl: 5 }} p="40px">
          <Box maxW="480px">
            <Heading as="h6"> Edit Product </Heading>
            {error && <Text color={"red.500"}>{"Something went wrong"}</Text>}

            <form onSubmit={handleEditProductFormSubmit}>
              <ToastContainer />
              <FormControl isRequired mb="15px">
                <FormLabel htmlFor="productName">Product Name</FormLabel>
                <Input
                  placeholder="productName"
                  name="productName"
                  type="input"
                  id="productName"
                  value={updateFormState.productName}
                  onChange={handleEditProductFormChange}
                />
              </FormControl>

              <FormControl isRequired mb="15px">
                <FormLabel htmlFor="productType">Product Type</FormLabel>

                <Select
                  placeholder="Select product type"
                  onChange={handleEditProductFormChange}
                  name="productType"
                  value={updateFormState.productType}
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
                  value={updateFormState.productDescription}
                  onChange={handleEditProductFormChange}
                />
              </FormControl>

              {/* <FormControl isRequired mb="15px">
                <FormLabel htmlFor="rules">Rules</FormLabel>
                <Select
                  variant="outline"
                  placeholder="Select operator"
                  // onChange={handleEditProductFormChange}
                  name="rules"
                  multiple={true}
                  values={editProductFormState.rules.map((rule) => rule._id)}
                >
                  {editProductFormState.rules &&
                    editProductFormState.rules.map((rule) => (
                      <option key={rule._id} value={rule._id}>
                        {rule.ruleName}
                      </option>
                    ))}
                </Select>
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
                <Button type="submit">Update</Button>
              </FormControl>
            </form>
          </Box>
        </GridItem>
      </Grid>
    </>
  );
};

export default EditProduct;
