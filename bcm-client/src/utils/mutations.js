import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($appUserEmail: String!, $appUserPassword: String!) {
    login(appUserEmail: $appUserEmail, appUserPassword: $appUserPassword) {
      token
      appUserDetails {
        _id
        appUserFirstName
        appUserLastName
        appUserEmail
        appUserRole
        appUserFullName
      }
    }
  }
`;

export const ADD_RULE = gql`
  mutation addRule(
    $ruleName: String!
    $ruleOperandField: String!
    $ruleOperator: String!
    $ruleValue: String!
  ) {
    addRule(
      ruleName: $ruleName
      ruleOperandField: $ruleOperandField
      ruleOperator: $ruleOperator
      ruleValue: $ruleValue
    ) {
      _id
      ruleName
      ruleOperandField
      ruleOperator
      ruleValue
    }
  }
`;

export const DELETE_RULE = gql`
  mutation deleteRule($ruleId: ID!) {
    deleteRule(ruleId: $ruleId) {
      _id
      ruleName
      ruleOperandField
      ruleOperator
      ruleValue
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation addProduct(
    $productName: String!
    $productType: String!
    $productDescription: String!
    $rules: [ID!]!
  ) {
    addProduct(
      productName: $productName
      productType: $productType
      productDescription: $productDescription
      rules: $rules
    ) {
      _id
      productName
      productType
      productDescription
      isCustomerInterested
      rules {
        _id
        ruleName
      }
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation updateProduct(
    $productId: ID!
    $productName: String
    $productType: String
    $productDescription: String
    $isCustomerInterested: String
    $rules: [ID!]
  ) {
    updateProduct(
      productId: $productId
      productName: $productName
      productType: $productType
      productDescription: $productDescription
      isCustomerInterested: $isCustomerInterested
      rules: $rules
    ) {
      _id
      productName
      productType
      productDescription
      isCustomerInterested
      rules {
        _id
        ruleName
      }
    }
  }
`;

export const SEND_EMAIL = gql`
  mutation sendEmail($email: String!) {
    sendEmail(email: $email) {
      responseMsg
    }
  }
`;

export const ADD_CUSTOMER = gql`
  mutation addCustomer(
    $customerFirstName: String!
    $customerLastName: String!
    $customerEmail: String!
    $customerGender: String!
    $customerSalary: Int!
    $customerResidentStatus: String!
    $customerDateOfBirth: String!
    $customerOccupation: String
  ) {
    addCustomer(
      customerFirstName: $customerFirstName
      customerLastName: $customerLastName
      customerEmail: $customerEmail
      customerGender: $customerGender
      customerSalary: $customerSalary
      customerResidentStatus: $customerResidentStatus
      customerDateOfBirth: $customerDateOfBirth
      customerOccupation: $customerOccupation
    ) {
      _id
      customerFirstName
      customerLastName
      customerEmail
      customerGender
      customerOccupation
      customerSalary
      customerResidentStatus
      customerDateOfBirth
      isCustomerEligible
      customerAge
      products {
        _id
        productName
        rules {
          _id
          ruleName
        }
      }
      interestedProducts {
        isCustomerInterested
      }
    }
  }
`;

export const ADD_INTEREST = gql`
  mutation addInterest($products: [ID]!, $isCustomerInterested: Boolean) {
    addInterest(
      products: $products
      isCustomerInterested: $isCustomerInterested
    ) {
      isCustomerInterested
      products {
        _id
        productName
      }
    }
  }
`;
