const typeDefs = `
type AppUser {
    _id: ID
    appUserName: String   
  }

type Query {
appUsers :[AppUser]!
}
`;

module.exports = typeDefs;
