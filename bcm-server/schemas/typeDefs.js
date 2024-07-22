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
  }

type Query {
appUsers :[AppUser]!
customers :[Customer]!
}
`;

module.exports = typeDefs;
