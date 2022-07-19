import { gql } from 'apollo-server-express';

export default gql`
    type Nft {
        _id:String,
        nftHash:String,
        imagePath:String,
        tokenId:String,
        user:User
    }

    type User {
        _id:String,
        email:String,
        password:String,
        nickname:String,
        dateOfBirth:String,
        pointBalance:Int,
        createdAt:String,
        disease: [Int],
        phoneNumber:String
    }


    type Query {
        getNfts(jwt:String!):[Nft]
        getAllNfts(jwt:String!):[Nft]
    }

    type Mutation {
        createNft(jwt:String!, nftHash:String!, imagePath:String!, tokenId:String!):Int!
    }
`