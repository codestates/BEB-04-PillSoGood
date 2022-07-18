import { gql } from 'apollo-server-express';

export default gql`
    type Nft {
        _id:String,
        nftHash:String,
        imagePath:String
        tokenId: String,
        tokenURI: String,
        createdAt: String
    }

    type Query {
        getNfts(jwt:String!):[Nft]
    }

    type Mutation {
        createNft(jwt:String!, tokenURI:String!, imagePath:String!):Int!
        bringMyNft(jwt:String!, _id:String!, tokenId:String!, receiveraddress:String!):Int!
    }
`