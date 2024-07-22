const typeDefs = `
type AppUser {
    _id: ID
    appUserFirstName: String
    appUserLastName: String
    appUserEmail: String
    appUserRole: String
    appUserFullName: String
   
  }

type Query {
appUsers :[AppUser]!
}
`;

module.exports = typeDefs;
