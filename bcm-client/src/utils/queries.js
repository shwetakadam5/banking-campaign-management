import { gql } from "@apollo/client";

//Within the backtic, write query exactly from the graphql playground.
export const QUERY_APPUSERS = gql`
  query getAllAppUsers {
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
      customerOccupation
      customerSalary
      customerResidentStatus
      customerDateOfBirth
      isCustomerEligible
      customerAge
      eligibleProductsCount
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
        interestedProductsCount
        products {
          _id
          productName
        }
      }
      createdBy {
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

export const QUERY_PRODUCTS = gql`
  query getProducts {
    products {
      _id
      productName
      productType
      productDescription
      rules {
        _id
        ruleName
        ruleOperandField
        ruleOperator
        ruleValue
      }
      applicableRulesCount
      allRuleNames
    }
  }
`;

export const QUERY_RULES = gql`
  query getRules {
    rules {
      _id
      ruleName
      ruleOperandField
      ruleOperator
      ruleValue
    }
  }
`;

export const QUERY_PRODUCT_BY_PRODUCT_NAME = gql`
  query getProductsByName($productName: String) {
    products(productName: $productName) {
      _id
      productName
      productType
      productDescription
      rules {
        _id
        ruleName
      }
    }
  }
`;

export const QUERY_PRODUCT_BY_PRODUCT_TYPE = gql`
  query getProductsByType($productType: String) {
    products(productType: $productType) {
      _id
      productName
      productType
      productDescription
      rules {
        _id
        ruleName
        ruleOperandField
        ruleOperator
        ruleValue
      }
      applicableRulesCount
      allRuleNames
    }
  }
`;

export const QUERY_PRODUCT_BY_ID = gql`
  query getProduct($id: ID!) {
    product(_id: $id) {
      _id
      productName
      productType
      productDescription
      rules {
        _id
        ruleName
        ruleOperandField
        ruleOperator
        ruleValue
      }
      applicableRulesCount
      allRuleNames
    }
  }
`;

export const QUERY_RULE_BY_ID = gql`
  query getRule($id: ID!) {
    rule(_id: $id) {
      _id
      ruleName
      ruleOperandField
      ruleOperator
      ruleValue
    }
  }
`;

export const QUERY_CUSTOMER_PRODUCTS = gql`
  query getCustomersProducts {
    customersProducts {
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
      eligibleProductsCount
      products {
        _id
        productName
        productType
        productDescription
      }
      interestedProducts {
        isCustomerInterested
        products {
          _id
          productName
          productType
          productDescription
        }
        interestedProductsCount
      }
      createdBy {
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

export const QUERY_CUSTOMER_INTEREST = gql`
  query getCustomerInterest($id: ID!) {
    customerInterest(_id: $id) {
      _id
      isCustomerInterested
      interestedProductsCount
      products {
        _id
        productName
        productType
        productDescription
      }
    }
  }
`;

export const QUERY_CUSTOMERS_BY_AGENT = gql`
  query getCustomersByAgent {
    customersByAgent {
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
      eligibleProductsCount
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
        interestedProductsCount
        products {
          _id
          productName
        }
      }
      createdBy {
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
