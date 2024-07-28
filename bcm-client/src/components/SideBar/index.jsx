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
      <List color="white" fontSize="1.2em" spacing={4}>
        <ListItem>
          <NavLink to="/customerhome">
            <ListIcon as={ViewIcon} color="blue.800"></ListIcon>
            Customer Dashboard
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink to="/addinterest">
            <ListIcon as={EditIcon} color="blue.800"></ListIcon> Add Interest
          </NavLink>
        </ListItem>
      </List>
    );
  } else if (
    isAuthUserloggedIn() &&
    getAuthUserProfile().authenticatedUser.appUserRole == "agent"
  ) {
    return (
      <List color="white" fontSize="1.2em" spacing={4}>
        <ListItem>
          {" "}
          <NavLink to="/agenthome">
            <ListIcon as={EditIcon} color="blue.800"></ListIcon>
            Add Customer
          </NavLink>
        </ListItem>
      </List>
    );
  } else if (
    isAuthUserloggedIn() &&
    getAuthUserProfile().authenticatedUser.appUserRole == "admin"
  ) {
    return (
      <List color="white" fontSize="1.2em" spacing={4}>
        <ListItem>
          <NavLink to="/adminhome">
            <ListIcon as={ViewIcon} color="blue.800"></ListIcon>
            View All Customers
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink to="/viewrules">
            <ListIcon as={ViewIcon} color="blue.800"></ListIcon>
            View All Rules
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink to="/viewproducts">
            <ListIcon as={ViewIcon} color="blue.800"></ListIcon>
            View All Products
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink to="/addrules">
            <ListIcon as={EditIcon} color="blue.800"></ListIcon>
            Add Rules
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink to="/addproducts">
            <ListIcon as={EditIcon} color="blue.800"></ListIcon>
            Add Products
          </NavLink>
        </ListItem>
      </List>
    );
  }
};

export default SideBar;
