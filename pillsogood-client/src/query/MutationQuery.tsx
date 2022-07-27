import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      jwt
      email
      nickname
    }
  }
`;

export const SIGN_UP = gql`
  mutation Mutation(
    $nickname: String!
    $email: String!
    $dateOfBirth: String!
    $password: String
    $phoneNumber: String
    $disease: [Int]
  ) {
    join(
      nickname: $nickname
      email: $email
      dateOfBirth: $dateOfBirth
      password: $password
      phoneNumber: $phoneNumber
      disease: $disease
    )
  }
`;
