import { List, ListIcon, ListItem } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { EditIcon, ViewIcon } from "@chakra-ui/icons";
import {
  jwtlogout,
  isAuthUserloggedIn,
  getAuthUserProfile,
} from "../../utils/jwtAuthentication";

const SideBar = () => {
  if (
    isAuthUserloggedIn() &&
    getAuthUserProfile().authenticatedUser.appUserRole == "customer"
  ) {
    return (
      <List color="#062452" fontSize="1.2em" spacing={4}>
        <ListItem>
          <NavLink to="/customerhome">
            <ListIcon as={ViewIcon} color="blue.800"></ListIcon>
            Products
          </NavLink>
        </ListItem>
      </List>
    );
  } else if (
    isAuthUserloggedIn() &&
    getAuthUserProfile().authenticatedUser.appUserRole == "agent"
  ) {
    return (
      <List color="#062452" fontSize="1.2em" spacing={4}>
        <ListItem>
          {" "}
          <NavLink to="/agenthome">
            <ListIcon as={EditIcon} color="blue.800"></ListIcon>
            Add Customer
          </NavLink>
        </ListItem>
        <ListItem>
          {" "}
          <NavLink to="/viewcustomers">
            <ListIcon as={ViewIcon} color="blue.800"></ListIcon>
            View Customers
          </NavLink>
        </ListItem>
      </List>
    );
  } else if (
    isAuthUserloggedIn() &&
    getAuthUserProfile().authenticatedUser.appUserRole == "admin"
  ) {
    return (
      <List color="#062452" fontSize="1.2em" spacing={4}>
        <ListItem>
          <NavLink to="/adminhome">
            <ListIcon as={ViewIcon} color="blue.800"></ListIcon>
            Customers
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink to="/viewrules">
            <ListIcon as={ViewIcon} color="blue.800"></ListIcon>
            Rules
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink to="/viewproducts">
            <ListIcon as={ViewIcon} color="blue.800"></ListIcon>
            Products
          </NavLink>
        </ListItem>
      </List>
    );
  }
};

export default SideBar;
