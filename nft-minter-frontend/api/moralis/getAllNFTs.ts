import Moralis from "moralis"
import { components } from "moralis/types/generated/web3Api"
import { DEFAULT_CHAIN } from "../../config";

export interface SingleParsedMetadata {
  name: string
  description: string
  image: string
}

export type SingleHandledNFTData = {
  parsedMetadata: SingleParsedMetadata | null
  meta: components['schemas']['nftContractMetadata']
} & components["schemas"]["nftOwner"]

const getAllNFTs = async (address: string, chain = (DEFAULT_CHAIN as components["schemas"]["chainList"])) => {
  const NFTList = await Moralis.Web3API.account.getNFTs({
    address,
    chain,
  })
  let res: SingleHandledNFTData[] = []
  if(!NFTList.result) return res;

  for (let i = 0; i < NFTList.result.length; i++) {
    const nft = NFTList.result[i];
    const metadata = await Moralis.Web3API.token.getNFTMetadata({
      chain,
      address: nft.token_address,
    });
    let NFT: SingleHandledNFTData = {
      ...nft,
      parsedMetadata: nft.metadata ? JSON.parse(nft.metadata) : null,
      meta: metadata,
    }
    res = [...res, NFT]
  }

  return res;
}

export default getAllNFTs