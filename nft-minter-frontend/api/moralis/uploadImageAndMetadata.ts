import MoralisHelpers from "lib/Handlers/MoralisHelpers";
import { MintERC721TokenMetadataOptions } from "./mint721Token";

export interface UploadImageAndMetadata {
    tokenId?: number
    imgFile: File
    metadataOptions?: MintERC721TokenMetadataOptions
}

const uploadImageAndMetadata = async ({
    tokenId, imgFile, metadataOptions,
}: UploadImageAndMetadata) => {
    const _tokenId = typeof tokenId === 'number' ? tokenId : ~~(Math.random() * 10000)
    const uploadedRes = await MoralisHelpers.saveFileToMoralisIPFS(imgFile.name, imgFile);
    const imgPath = MoralisHelpers.getUploadedPathFromResult(uploadedRes);
    console.log(imgPath)

    const metadata = MoralisHelpers.makeImgMetaDataByPath({
        name: 'New NFT!!' + new Date().getTime(),
        description: 'HI!',
        imgPath,
        ...metadataOptions,
    });
    const metaJSON = MoralisHelpers.makeImgMetaDataJSON(_tokenId, metadata);
    const uploadedTokenRes = await MoralisHelpers.saveFileToMoralisIPFS(metaJSON.name, undefined as any, metaJSON.data.base64);
    const tokenURI = MoralisHelpers.getUploadedPathFromResult(uploadedTokenRes)
    console.log(tokenURI)
}

export default uploadImageAndMetadata