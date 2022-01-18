import { Box, Paper } from '@mui/material';
import Moralis from 'moralis'
import { components } from 'moralis/types/generated/web3Api';
import { useCallback, useEffect, useRef, useState } from 'react';
import abi from 'static/abi.json';

type Callback = (...params: any) => any

export interface SingleParsedMetadata {
    name: string
    description: string
    image: string
}

interface BasicMetadata {
  name: string
  description: string,
  image: string,
}

interface CommonNFTInfo {
    token_address: string
    token_id: string
    block_number_minted: string
    owner_of: string
    block_number: string
    amount: string
    contract_type: string // ERC1155...
    name: string
    symbol: string
    token_uri: string
    metadata: string
    synced_at: string // 2021-12-21T06:48:48.276Z
    is_valid: number // 1 or 0 ?
    syncing: number
    frozen: number
    parsedMetadata: SingleParsedMetadata | null
    meta: SingleParsedMetadata | null
}

//----------------------------------------------------------------------------------------------------
// functions

// 取得剛剛填寫在env的參數
const serverUrl = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;
const appId = process.env.NEXT_PUBLIC_MORALIS_APP_ID;
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string;

const startMoralisAndGetCurrentUser = async () => {
  await Moralis.start({
    serverUrl,
    appId,
  });

  let user = Moralis.User.current();
  if(!user) {
    user = await Moralis.Web3.authenticate();
  }
  console.log(user)
  return user;
}

export const fetchTokenMetadata = (tokenURI: string): Promise<BasicMetadata> => (
  fetch(tokenURI).then(res => res.json())
)

export const getNFTMetadata = async (metaFromNFTResult: string | undefined, tokenURI?: string) => {
  if(metaFromNFTResult) return JSON.parse(metaFromNFTResult);
  if(!tokenURI || !tokenURI.includes('ipfs')) return null;
  const fetchedMeta = await fetchTokenMetadata(tokenURI);
  return fetchedMeta;
}


export type SingleHandledNFTData = {
  parsedMetadata: SingleParsedMetadata | null
  meta?: components['schemas']['nftContractMetadata']
} & CommonNFTInfo

const getAllNFTs = async (address: string, chain = 'rinkeby' as any) => {
  const NFTList = await Moralis.Web3API.account.getNFTs({
    address,
    chain,
  }) as { result: CommonNFTInfo[] }
  console.log(NFTList)
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

const openBlindBox = async (tokenId: number) => {
    try {
        const options: Moralis.ExecuteFunctionOptions = {
            abi,
            contractAddress: CONTRACT_ADDRESS,
            functionName: 'openBlindBox',
            params: {
                id: tokenId,
            },
        }
        const executed = await Moralis.Web3.executeFunction(options);
        console.log(executed);
    } catch (error) {
        console.log(error);
    }
}

//----------------------------------------------------------------------------------------------------
// components

export interface NFTCardItemProps {
    commonTokenInfo: CommonNFTInfo
    metadata: SingleParsedMetadata | null
    onOpenBlindBox: Callback
  }
  
  const NFTCardItem = ({
    commonTokenInfo,
    metadata,
    onOpenBlindBox,
  }: NFTCardItemProps) => {
    if(!metadata) return null;
    const {
      amount,
      owner_of,
      token_id,
    } = commonTokenInfo
    return (
      <Paper
        className={'p-1 m-1 w-1/6'}
        elevation={2}
      >
        <div
        >
          <div>
            {metadata.name}
          </div>
          <div>
            <img className={'h-60 w-auto'} src={metadata.image} alt={'metadata-img'} />
          </div>
          <p>{`Token Id: ${token_id}`}</p>
          <p>{`Owner: ${owner_of}`}</p>
          <p>{`Amount: ${amount}`}</p>
        </div>
        <button onClick={onOpenBlindBox}>
          {'Open'}
        </button>
      </Paper>
    )
}


const App = () => {
    const userAddressRef = useRef<string>();
    const [user, setUser] = useState<Moralis.User<Moralis.Attributes>>();
    const [nftList, setNft] = useState<SingleHandledNFTData[]>([]);

    useEffect(() => {
        (async () => {
            try {
              const _user = await startMoralisAndGetCurrentUser();
              const userAddress = Array.isArray(_user.attributes.accounts) ? _user.attributes.accounts[0] : undefined;
              if(userAddress) {
                userAddressRef.current = userAddress;
                const _nftList = await getAllNFTs(userAddress);
                console.log(_nftList);
                setNft(_nftList)
              }
              setUser(_user);
            } catch (error) {
              console.log(error);
            }
        })
    }, [])

    const handleOpenBlindBox = useCallback((tokenId: number) => async () => {
        await openBlindBox(tokenId);
      }, [])

    return (
        <Box>
            {nftList.map(n => (
                <NFTCardItem 
                    key={n.token_address + n.token_id}
                    commonTokenInfo={n}
                    metadata={n.parsedMetadata}
                    onOpenBlindBox={handleOpenBlindBox(Number(n.token_id))}
                />
            ))}
        </Box>
  )
}

export default App