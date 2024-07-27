import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Spacer,
  HStack,
} from "@chakra-ui/react";
//Importing the global context related files.
import { useGlobalAppContext } from "../../utils/GlobalAppContext";
import { jwtlogout, isAuthUserloggedIn } from "../../utils/jwtAuthentication";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [state, dispatch] = useGlobalAppContext();
  console.log(state);
  const navigate = useNavigate();
  const applicationLogout = (event) => {
    event.preventDefault();
    jwtlogout();
    navigate("/");
  };

  if (isAuthUserloggedIn()) {
    return (
      <Flex as="nav" p="10px" alignItems="center">
        <Heading as="h1">BCM System</Heading>
        <Spacer />
        <HStack spacing="20px">
          <Box p="10px" bg="gray.200">
            {state.authAppUserDetail.appUserFullName}
          </Box>
          <Text>{state.authAppUserDetail.appUserEmail}</Text>
          <Button colorScheme="blue" onClick={applicationLogout}>
            Logout
          </Button>
        </HStack>
      </Flex>
    );
  } else {
    return (
      <Flex as="nav" p="10px" alignItems="center" justifyContent="center">
        <Heading as="h1">BCM System</Heading>
      </Flex>
    );
  }
};

export default NavBar;
