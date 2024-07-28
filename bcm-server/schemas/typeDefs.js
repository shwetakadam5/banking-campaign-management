const typeDefs = `
type AppUser {
    _id: ID
    appUserFirstName: String
    appUserLastName: String
    appUserEmail: String
    appUserRole: String
    appUserFullName: String
    }

type Customer {
    _id: ID
    customerFirstName: String
    customerLastName: String
    customerEmail: String
    customerGender: String
    customerOccupation: String
    customerSalary : Float
    customerResidentStatus : String
    customerDateOfBirth : String
    isCustomerEligible : Boolean
    customerAge : Int
    products : [Product]
    interestedProducts : CustomerInterest
    createdBy : AppUser
    eligibleProductsCount : Int
  }

type Product {
    _id: ID
    productName: String
    productType: String
    productDescription: String   
    rules: [Rule]
    applicableRulesCount : Int
    allRuleNames :String

  }
    
type Rule {
    _id: ID
    ruleName: String
    ruleOperandField : String
    ruleOperator : String
    ruleValue : String   
  }

type AuthorizedUser {
    token: ID
    appUserDetails : AppUser
  }

type EmailResponse {
    responseMsg: String
  }

type CustomerInterest {
    _id: ID
    isCustomerInterested: Boolean
    products : [Product]
    interestedProductsCount :Int
    
  }

type Query {
    appUsers :[AppUser]!
    customers :[Customer]!   
    products(productName: String, productType : String): [Product]!
    rules : [Rule]!
    product(_id: ID!): Product
    rule(_id: ID!): Rule
    customersProducts: Customer
    customerInterest(_id: ID!) : CustomerInterest
  }

type Mutation {
     login(appUserEmail: String!, appUserPassword: String!): AuthorizedUser
     addRule(ruleName : String!, ruleOperandField : String!, ruleOperator: String!, ruleValue : String!) : Rule
     deleteRule(ruleId: ID!): Rule
     addProduct(productName : String!, productType : String!, productDescription: String!, rules : [ID!]!) : Product
     updateProduct(productId: ID! ,productName : String, productType : String, productDescription: String, rules : [ID!]): Product
     sendEmail(email : String!) : EmailResponse
     addCustomer(customerFirstName : String!, customerLastName : String!,customerEmail : String!,customerGender : String!,customerOccupation : String,customerSalary : Int!,customerResidentStatus : String!,customerDateOfBirth : String!) : Customer
     addInterest(products: [ID]!) :  CustomerInterest    
  }
`;

module.exports = typeDefs;
