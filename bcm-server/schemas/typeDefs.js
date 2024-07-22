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
    customerOccuptation: String
    customerSalary : Float
    customerResidentStatus : String
    customerDateOfBirth : String
    isCustomerEligible : Boolean
    customerAge : Int
    products : [Product]
  }

type Product {
    _id: ID
    productName: String
    productType: String
    productDescription: String
    isCustomerInterested: Boolean
    rules: [Rule]
  }
    
type Rule {
    _id: ID
    ruleOperandField : String
    ruleOperator : String
    ruleValue : String   
  }

type Query {
appUsers :[AppUser]!
customers :[Customer]!
products : [Product]!
rules : [Rule]!
}
`;

module.exports = typeDefs;
