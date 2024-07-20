import { gql } from "@apollo/client";

//Within the backtic, write query exactly from the graphql playground.
export const QUERY_APPUSERS = gql`
  query allAppUsers {
    appUsers {
      _id
      appUserName
    }
  }
`;
