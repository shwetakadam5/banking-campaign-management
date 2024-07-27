import { List, ListIcon, ListItem } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { ViewIcon } from "@chakra-ui/icons";
import {
  jwtlogout,
  isAuthUserloggedIn,
  getAuthUserProfile,
} from "../../utils/jwtAuthentication";

const SideBar = () => {
  console.log(isAuthUserloggedIn());
  if (
    isAuthUserloggedIn() &&
    getAuthUserProfile().authenticatedUser.appUserRole == "customer"
  ) {
    return (
      <List color="white" fontSize="1.2em" spacing={4}>
        <ListItem>
          <NavLink to="/customerhome">
            <ListIcon as={ViewIcon} color="blue.800"></ListIcon>
            Customer Dashboard
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink to="">Link 2</NavLink>
        </ListItem>
        <ListItem>
          <NavLink to="">Link 3</NavLink>
        </ListItem>
      </List>
    );
  } else if (
    isAuthUserloggedIn() &&
    getAuthUserProfile().authenticatedUser.appUserRole == "agent"
  ) {
    return (
      <List color="white" fontSize="1.2em" spacing={4}>
        <ListItem>Agent links</ListItem>
      </List>
    );
  } else if (
    isAuthUserloggedIn() &&
    getAuthUserProfile().authenticatedUser.appUserRole == "admin"
  ) {
    return (
      <List color="white" fontSize="1.2em" spacing={4}>
        <ListItem>Admin Links</ListItem>
      </List>
    );
  }
};

export default SideBar;
