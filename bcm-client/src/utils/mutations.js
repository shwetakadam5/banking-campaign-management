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

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($productId: ID!) {
    deleteProduct(productId: $productId) {
      numOfCustomersUpdated
      product {
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
  }
`;
