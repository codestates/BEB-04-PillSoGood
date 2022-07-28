import { getUserInfoByToken } from "../../utils/jwt"
import { status } from "../../constants/code"
import { createLog } from "../../utils/log"
import { NFTStorage, File, Blob } from 'nft.storage'
import fs from 'fs'
import dotenv from "dotenv";

const Character = require("../../models/character")
const moment = require("moment")

dotenv.config();

declare let process : {
    env : {
      NFT_STORAGE_API_TOKEN : string;
    }
} 

const client = new NFTStorage({ token: process.env.NFT_STORAGE_API_TOKEN })


type character = {
    _id: string
    userId:string
    name:string
    level:number
    description: string
}

export default {
    Query: {
        async getCharacters(_:any, args:{jwt:string}){
            const userInfo = getUserInfoByToken(args.jwt)
            if(!userInfo) return status.TOKEN_EXPIRED
            
            createLog("getCharacters", userInfo._id)

            const characters = Character.find({
                userId:userInfo._id
            })
            return characters
        }
    },
    Mutation: {
        async createCharacter(_:any, args:{jwt:string, name:string, baseId:string, description:string}) {
            const userInfo = getUserInfoByToken(args.jwt)
            if(!userInfo) return status.TOKEN_EXPIRED

            createLog("createCharacter", userInfo._id)

            const newCharacter = new Character()
            newCharacter.name = args.name
            newCharacter.level = 1
            newCharacter.userId = userInfo._id
            newCharacter.baseId = args.baseId
            newCharacter.description = args.description
            newCharacter.createdAt = moment().format("YYYY-MM-DD HH:mm:ss")
            const res = await newCharacter.save()

            const download = require('image-downloader');
            const options = {
                url: args.baseId,
                dest: '../../images',               // will be saved to /path/to/dest/image.jpg
              };

            const imageFileName = await download.image(options)
              .then(({ filename }:any) => {
                return filename
              })

            const metadata = await client.store({
                name: args.name,
                description: args.description,
                image: new File([fs.readFileSync(imageFileName)], "image.jpeg", {type:"image/jpeg"})
              })
              
            console.log(metadata.url)
            if(!res) return status.SERVER_ERROR
            return status.SUCCESS
        },
        async updateCharacter(_:any, args:{jwt:string, _id:string, name:string, level:number, description:string}){
            const userInfo = getUserInfoByToken(args.jwt)
            if(!userInfo) return status.TOKEN_EXPIRED

            createLog("updateCharacter", userInfo._id)

            const res = await Character.updateOne(
                {_id:args._id, userId:userInfo._id},
                {name:args.name, level:args.level, description: args.description}
            )
            if(!res) return status.SERVER_ERROR
            return status.SUCCESS
        },
        async deleteCharacter(_:any, args:{jwt:string, _id:string}){
            const userInfo = getUserInfoByToken(args.jwt)
            if(!userInfo) return status.TOKEN_EXPIRED

            createLog("deleteCharacter", userInfo._id)
            
            const res = await Character.deleteOne(
                {_id:args._id, userId:userInfo._id}
            )
            if(!res) return status.SERVER_ERROR
            return status.SUCCESS
        }
    }
}