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
