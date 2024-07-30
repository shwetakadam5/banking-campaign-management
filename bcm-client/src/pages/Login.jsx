import { useState } from "react";
import { useGlobalAppContext } from "../utils/GlobalAppContext";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
//Application specific imports
import { LOGIN } from "../utils/mutations";
import { jwtlogin } from "../utils/jwtAuthentication";
import { SET_USER } from "../utils/actions";
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

const Login = () => {
  const [state, dispatch] = useGlobalAppContext();

  const navigate = useNavigate();

  const [loginFormState, setLoginFormState] = useState({
    appUserEmail: "",
    appUserPassword: "",
  });

  const [login, { error }] = useMutation(LOGIN);

  const handleLoginFormSubmit = async (event) => {
    event.preventDefault();

    const userLoginResponse = await login({
      variables: {
        appUserEmail: loginFormState.appUserEmail,
        appUserPassword: loginFormState.appUserPassword,
      },
    });

    const token = userLoginResponse.data.login.token;
    jwtlogin(token);

    // set the user details on the global context
    dispatch({
      type: SET_USER,
      payload: userLoginResponse.data.login.appUserDetails,
    });

    //based on user role we can navigate them to the appropriate pages.
    if (userLoginResponse.data.login.appUserDetails.appUserRole === "admin") {
      navigate("/adminHome");
    } else if (
      userLoginResponse.data.login.appUserDetails.appUserRole === "agent"
    ) {
      navigate("/agentHome");
    } else {
      navigate("/customerHome");
    }
  };

  const handleLoginFormChange = (event) => {
    const { name, value } = event.target;
    setLoginFormState({ ...loginFormState, [name]: value });
  };

  return (
    <Grid templateColumns="repeat(6, 1fr)" bg="blue.50">
      <GridItem
        as="aside"
        colSpan={{ base: 6, md: 3, lg: 2, xl: 1 }}
        bg="blue.400"
        minHeight={{ lg: "100vh" }}
        p={{ base: "20px", lg: "30px" }}
      >
        <Text></Text>
      </GridItem>
      <GridItem as="main" colSpan={{ base: 6, md: 3, lg: 4, xl: 5 }} p="40px">
        <Box maxW="480px">
          <Heading as="h6"> Login </Heading>
          <form onSubmit={handleLoginFormSubmit}>
            {error ? (
              <div>
                <p className="error-text">
                  The provided credentials are incorrect
                </p>
              </div>
            ) : null}

            <FormControl isRequired mb="15px">
              <FormLabel htmlFor="email">Email Id :</FormLabel>

              <Input
                placeholder="youremail@test.com"
                name="appUserEmail"
                type="email"
                id="email"
                onChange={handleLoginFormChange}
              />
            </FormControl>
            <FormControl isRequired mb="15px">
              <FormLabel htmlFor="pwd">Password:</FormLabel>
              <Input
                placeholder="******"
                name="appUserPassword"
                type="password"
                id="pwd"
                onChange={handleLoginFormChange}
              />
            </FormControl>
            <FormControl mb="15px">
              <Button type="submit">Submit</Button>
            </FormControl>
          </form>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default Login;
