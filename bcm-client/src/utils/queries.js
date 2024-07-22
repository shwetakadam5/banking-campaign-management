import { gql } from "@apollo/client";

//Within the backtic, write query exactly from the graphql playground.
export const QUERY_APPUSERS = gql`
  query allAppUsers {
    appUsers {
      _id
      appUserFirstName
      appUserLastName
      appUserEmail
      appUserRole
      appUserFullName
    }
  }
`;

export const QUERY_CUSTOMERS = gql`
  query getCustomers {
    customers {
      _id
      customerFirstName
      customerLastName
      customerEmail
      customerGender
      customerOccuptation
      customerSalary
      customerResidentStatus
      customerDateOfBirth
      isCustomerEligible
      customerAge
    }
  }
`;
