import Moralis from "moralis"

export interface ImgMetadataParams {
  name: string
  description: string,
  imgHash: string,
}
export interface BasicMetadata {
  name: string
  description: string,
  image: string,
}

const MoralisHelpers = {
  makeImgMetaData: ({
    name, description, imgHash,
  }: ImgMetadataParams) => ({
    name,
    description,
    image: `/ipfs/${imgHash}`
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

  getAddressFromUser: (user: Moralis.User<Moralis.Attributes>) => {
    const res = Array.isArray(user.attributes.accounts) ? user.attributes.accounts[0] : undefined;
    return res;
  },
}

export default MoralisHelpers