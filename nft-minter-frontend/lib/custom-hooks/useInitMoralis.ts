import mint721Token, { MintERC721TokenMetadataOptions } from "api/moralis/mint721Token";
import mintNFT from "api/moralis/mintNFT";
import mintWholeNewNFT from "api/moralis/mintWholeNewNFT";
import transferNFT from "api/moralis/transferNFT";
import Moralis from "moralis";
import { ChangeEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react"
import getAllNFTs, { SingleHandledNFTData } from "../../api/moralis/getAllNFTs";
import startMoralisAndGetCurrentUser from "../../api/moralis/startMoralis";
import MoralisHelpers from "../Handlers/MoralisHelpers";

const initMintInputState: MintERC721TokenMetadataOptions = {
  name: undefined,
  description: undefined,
}

const useInitMoralis = () => {
  const userAddressRef = useRef<string>();
  const fileRef = useRef<File>();

  const [mintInputState, setMintInputState] = useState(initMintInputState)
  const [user, setUser] = useState<Moralis.User<Moralis.Attributes>>();
  const [nftList, setNft] = useState<SingleHandledNFTData[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const _user = await startMoralisAndGetCurrentUser();
        const userAddress = MoralisHelpers.getAddressFromUser(_user);
        if(userAddress) {
          userAddressRef.current = userAddress;
          const _nftList = await getAllNFTs(userAddress);
          console.log(_nftList);
          // await mintNFT(userAddress)(1, 1);
          setNft(_nftList);
        }
        setUser(_user);
      } catch (error) {
        console.log(error);
      }
    })()
  }, []);

  const handleMint = useCallback(() => {
    (async () => {
      if(userAddressRef.current) {
        // await mintNFT(userAddressRef.current)({
        //   nftTokenId: 3, amount: 1,
        // });
      }
    })()   
  }, []);

  const handleMintNewNFT = useCallback(() => {
    return (async () => {
      if(userAddressRef.current && fileRef.current) {
        const metadataOptions = mintInputState
        await mint721Token(userAddressRef.current)({
          imgFile: fileRef.current,
          nftTokenId: 3, // how to get latest nft token?
          metadataOptions,
        });
        setMintInputState(initMintInputState);
        fileRef.current = undefined;
        // await mintWholeNewNFT({
        //   imgFile: fileRef.current,
        //   address: userAddressRef.current,
        //   nftTokenId: 3,
        // })
      }
    })()
  }, [JSON.stringify(mintInputState)]);

  const handleTransferNFT = useCallback(() => {
    if(userAddressRef.current) {
      // transferNFT(1, userAddressRef.current)
      transferNFT(1, '0xe998E57193fA7215546c3a45576D52A9940f1f80')
    }
  }, [])

  const handleSetFile = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.files?.length) [
      fileRef.current = e.target.files[0]
    ]
  }, []);

  const handleChangeMintInputState = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if(!e.target.name) return;
    setMintInputState(s => ({
      ...s,
      [e.target.name]: e.target.value
    }))
  }, [])

  return ({
    user,
    userAddressRef,
    nftList,
    handleMint,
    handleMintNewNFT,
    handleTransferNFT,
    handleSetFile,
    handleChangeMintInputState,
  })
}

export default useInitMoralis