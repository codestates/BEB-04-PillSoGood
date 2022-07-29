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
  mutation UpdateUserBalance($jwt: String!, $pointBalance: Int) {
  updateUserBalance(jwt: $jwt, pointBalance: $pointBalance)
}
`


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
  mutation CreateCharacter($jwt: String!, $name: String!, $baseId: String!, $description: String!) {
  createCharacter(jwt: $jwt, name: $name, baseId: $baseId, description: $description)
}
  ` 


export const NftQuery = gql`
query GetCharacters($jwt: String!) {
  getCharacters(jwt: $jwt) {
    _id
    userId
    name
    level
    baseId
    description
    hash
    tokenId
  }
}
`
