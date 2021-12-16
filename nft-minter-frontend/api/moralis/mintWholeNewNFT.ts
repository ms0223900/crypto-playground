import { readFileSync } from "fs"
import MoralisHelpers from "lib/Handlers/MoralisHelpers"
import mintNFT from "./mintNFT";

export interface MintWholeNewNFTOptions {
  imgFile: File
  address: string
  nftTokenId: number
}

const mintWholeNewNFT = async ({
    imgFile,
    address,
    nftTokenId,
}: MintWholeNewNFTOptions) => {
    // create new nft infos
    const fileHash = await MoralisHelpers.saveFileToMoralis(imgFile.name, imgFile);
    console.log(fileHash);
    const metadata = MoralisHelpers.makeImgMetaData({
        name: 'New NFT!!' + new Date().getTime(),
        description: 'HI!',
        imgHash: fileHash,
    });
    const metaJSON = MoralisHelpers.makeImgMetaDataJSON(nftTokenId, metadata);
    const jsonHash = await MoralisHelpers.saveFileToMoralis(metaJSON.name, metaJSON.data);
    console.log(jsonHash)
    // mint NFT
    // await mintNFT(address)({ nftTokenId, amount: 1, });
}

export default mintWholeNewNFT