import { BasicMetadata } from "lib/Handlers/MoralisHelpers";
import Moralis from "moralis"
import { components } from "moralis/types/generated/web3Api"
import { DEFAULT_CHAIN } from "../../config";

export const fetchERC721TokenMetadata = (tokenURI: string): Promise<BasicMetadata> => (
  fetch(tokenURI).then(res => res.json())
)

export const getNFTMetadata = async (metaFromNFTResult: string | undefined, tokenURI?: string) => {
  if(metaFromNFTResult) return JSON.parse(metaFromNFTResult);
  if(!tokenURI || !tokenURI.includes('ipfs')) return null;
  const fetchedMeta = await fetchERC721TokenMetadata(tokenURI);
  return fetchedMeta;
}

export interface SingleParsedMetadata {
  name: string
  description: string
  image: string
}

export type SingleHandledNFTData = {
  parsedMetadata: SingleParsedMetadata | null
  meta?: components['schemas']['nftContractMetadata']
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
    const metadata = await getNFTMetadata(nft.metadata, nft.token_uri)
    let NFT: SingleHandledNFTData = {
      ...nft,
      parsedMetadata: metadata,
      meta: metadata,
    }
    res = [...res, NFT]
  }

  return res;
}

export default getAllNFTs