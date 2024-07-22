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

export const QUERY_PRODUCTS = gql`
  query getProducts {
    products {
      _id
      productName
      productType
      productDescription
      isCustomerInterested
      rules
    }
  }
`;

export const QUERY_RULES = gql`
  query getRules {
    rules {
      _id
      ruleOperandField
      ruleOperator
      ruleValue
    }
  }
`;
