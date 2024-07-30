import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Spacer,
  HStack,
} from "@chakra-ui/react";
import Avatar from "react-avatar";

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
      <Box height={"100px"} bgColor={"blue.400"}>
        <Flex as="nav" p="30px" mb="40px" alignItems="center">
          <Heading as="h1" color={"#062452"}>
            Banking Campaign Management
          </Heading>
          <Spacer />
          <HStack spacing="20px">
            {/* <Box p="10px" bg="gray.200">
              {getAuthUserProfile().authenticatedUser.appUserFullName}
            </Box> */}
            <Avatar
              //githubHandle="shwetakadam5"
              // src={avatarWoman}
              name={getAuthUserProfile().authenticatedUser.appUserFullName}
              size="40"
              round={true}
              color={"#0C3C84"}
              initials={(name) =>
                name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
              }
            />
            <Text>{getAuthUserProfile().authenticatedUser.appUserEmail}</Text>
            <Button
              bgColor={"#0C3C84"}
              color={"white"}
              onClick={applicationLogout}
            >
              Logout
            </Button>
          </HStack>
        </Flex>
      </Box>
    );
  } else {
    return (
      <Box height={"100px"} bgColor={"blue.400"}>
        <Flex as="nav" p="30px" alignItems="center" justifyContent="center">
          <Heading as="h1" color={"#062452"}>
            Banking Campaign Management
          </Heading>
        </Flex>
      </Box>
    );
  }
};

export default NavBar;
