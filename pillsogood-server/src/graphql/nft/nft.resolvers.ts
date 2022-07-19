import { getUserInfoByToken } from "../../utils/jwt"
import { status } from "../../constants/code"
import { createLog } from "../../utils/log"

const Nft = require("../../models/nft")
const User = require("../../models/user")

type nft = {
    _id: string
    nftHash: string
    imagePath: string
    tokenId: string
    user: user
}

type user = {
    _id: string
    email: string
    nickname: string
    dateOfBirth: string
    pointBalance: number
    createdAt: string
    phoneNumber: string
    disease: [number]

}

export default {
    Nft: {
        async user(root:any) {
            const userInfo = await User.findOne({
                _id:root.userId
            })
            return userInfo
        }
    },
    Query: {
        async getAllNfts(_:any, args:{jwt:string}) {
            const userInfo = getUserInfoByToken(args.jwt)
            if(!userInfo) return status.TOKEN_EXPIRED

            const nfts = Nft.find()
            return nfts
        },
        async getNfts(_:any, args:{jwt:string}) {
            const userInfo = getUserInfoByToken(args.jwt)
            if(!userInfo) return status.TOKEN_EXPIRED

            createLog("getNfts", userInfo._id)
            
            const nfts = Nft.find({
                userId:userInfo._id
            })
            return nfts
        }
    },
    Mutation: {
        async createNft(_:any, args:{jwt:string, nftHash:string, imagePath:string, tokenId:string}) {
            const userInfo = getUserInfoByToken(args.jwt)
            if(!userInfo) return status.TOKEN_EXPIRED

            createLog("createNft", userInfo._id)

            const newNft = new Nft()
            newNft.nftHash = args.nftHash
            newNft.imagePath = args.imagePath
            newNft.userId = userInfo._id
            newNft.tokenId = args.tokenId

            const res = await newNft.save()
            if(!res) return status.SERVER_ERROR
            return status.SUCCESS
        },
    }
}