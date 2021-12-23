import { CONTRACT_ADDRESS } from "config";
import { readFileSync } from "fs";
import convertFileToBase64 from "lib/functions/convertFileToBase64";
import Moralis from "moralis"
import abi from '../../static/abi.json';

export interface ImgMetadataParams {
  name: string
  description: string,
  imgHash: string,
}
export interface ImgMetadataByPathParams extends Omit<ImgMetadataParams, 'imgHash'> {
  imgPath: string
}
export interface BasicMetadata {
  name: string
  description: string,
  image: string,
}

const MoralisHelpers = {
  getUploadedPathFromResult: (res: any) => (
    res[0].path
  ),

  makeImgMetaData: ({
    name, description, imgHash,
  }: ImgMetadataParams) => ({
    name,
    description,
    image: `/ipfs/${imgHash}`
  }),

  makeImgMetaDataByPath: ({
    name, description, imgPath,
  }: ImgMetadataByPathParams) => ({
    name,
    description,
    image: imgPath,
  }),

  makeMetadataFileNameFromTokenId: (tokenId: number) => (
    `${Array(64).fill('0').join('')}${tokenId}`.slice(-64)
  ),

  makeImgMetaDataJSON(tokenId: number, imgMetaData: BasicMetadata) {
    return ({
      name: `${this.makeMetadataFileNameFromTokenId(tokenId)}.json`,
      data: { base64 : btoa(JSON.stringify(imgMetaData)) },
    })
  },

  saveFileToMoralis: async (dataName: string, data: any) => {
    const file = new Moralis.File(dataName, data);
    await file.save();
    const hash = (file as any).hash();
    return hash;
  },

  saveFileToMoralisIPFS: async (dataName: string, data: File, base64Data?: string) => {
    const fileBase64 = base64Data || await convertFileToBase64(data)
    const options = {
      abi: [
        {
          path: `moralis/${dataName}`,
          content: fileBase64,
        }
      ]
    }
    console.log(options)
    const uploadFn = Moralis.Web3API.storage.uploadFolder as any
    const path = await uploadFn(options)
    console.log(path);
    return path;
  },

  getAddressFromUser: (user: Moralis.User<Moralis.Attributes>) => {
    const res = Array.isArray(user.attributes.accounts) ? user.attributes.accounts[0] : undefined;
    return res;
  },

  makeExecuteFunctionOptions: (options: Omit<Moralis.ExecuteFunctionOptions, 'contractAddress' | 'abi'>): Moralis.ExecuteFunctionOptions => ({
    contractAddress: CONTRACT_ADDRESS,
    abi,
    ...options,
  })
}

export default MoralisHelpers