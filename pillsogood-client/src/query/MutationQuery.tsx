import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      jwt
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

  export const USERQUERY = gql`
  query GetUserInfo($jwt: String!) {
  getUserInfo(jwt: $jwt) {
    email
    nickname
    password
    dateOfBirth
    pointBalance
    _id
    createdAt
    disease
    phoneNumber
  }
}
  `

  export const UserMutation = gql`
  mutation UpdateUserInfo($jwt: String!, $nickname: String, $password: String, $phoneNumber: String, $email: String, $disease: [Int]) {
  updateUserInfo(jwt: $jwt, nickname: $nickname, password: $password, phoneNumber: $phoneNumber, email: $email, disease: $disease)
}`


  export const CharQuery = gql`
  query GetBases($jwt: String!) {
   getBases(jwt: $jwt) {
     _id
     name
     level
     imagePath
   }
  }
 `

 
  export const CharSubmit = gql`
  mutation CreateCharacter($jwt: String!, $name: String!, $baseId: String!) {
   createCharacter(jwt: $jwt, name: $name, baseId: $baseId)
 }
  ` 
