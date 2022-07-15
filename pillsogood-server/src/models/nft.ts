import { model, Schema } from "mongoose";

const nft = new Schema({
    userId: String,
    nftHash: String,
    imagePath: String,
    tokenId: String
})

module.exports = model('Nft', nft); 