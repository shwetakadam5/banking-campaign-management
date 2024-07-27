import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Spacer,
  HStack,
} from "@chakra-ui/react";

import {
  jwtlogout,
  isAuthUserloggedIn,
  getAuthUserProfile,
} from "../../utils/jwtAuthentication";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  
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
            {getAuthUserProfile().authenticatedUser.appUserFullName}
          </Box>
          <Text>{getAuthUserProfile().authenticatedUser.appUserEmail}</Text>
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
