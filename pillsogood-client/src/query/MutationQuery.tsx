import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login(
    $email: String!, 
    $password: String!, 
    $firebaseToken: String!
    ) {
    login(email: $email, password: $password, firebaseToken: $firebaseToken) {
      jwt
      email
      nickname
      _id
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

export const MEDICINE_ALARM = gql`
  mutation CreatePrescriptionRecord(
    $jwt: String!
    $medicine: String!
    $alertTime: String!
    $lastMedicationCount: Int!
  ) {
    createPrescriptionRecord(
      jwt: $jwt
      medicine: $medicine
      alertTime: $alertTime
      lastMedicationCount: $lastMedicationCount
    )
  }
`;

export const HEALTH = gql`
  mutation CreateHealthRecord(
    $jwt: String!, 
    $height: Int!, 
    $weight: Int!, 
    $lowHypertension: Int!, 
    $highHypertension: Int!, 
    $bloodSugarLevel: Int!) {
  createHealthRecord(
    jwt: $jwt, 
    height: $height, 
    weight: $weight, 
    lowHypertension: $lowHypertension, 
    highHypertension: $highHypertension, 
    bloodSugarLevel: $bloodSugarLevel)
}
    `; 
