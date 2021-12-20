import mint721Token from "api/moralis/mint721Token";
import mintNFT from "api/moralis/mintNFT";
import mintWholeNewNFT from "api/moralis/mintWholeNewNFT";
import Moralis from "moralis";
import { ChangeEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react"
import getAllNFTs, { SingleHandledNFTData } from "../../api/moralis/getAllNFTs";
import startMoralisAndGetCurrentUser from "../../api/moralis/startMoralis";
import MoralisHelpers from "../Handlers/MoralisHelpers";

const useInitMoralis = () => {
  const userAddressRef = useRef<string>();
  const fileRef = useRef<File>();

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
    (async () => {
      if(userAddressRef.current && fileRef.current) {
        mint721Token(userAddressRef.current)({
          imgFile: fileRef.current,
          nftTokenId: 1,
        })
        // await mintWholeNewNFT({
        //   imgFile: fileRef.current,
        //   address: userAddressRef.current,
        //   nftTokenId: 3,
        // })
      }
    })()
  }, []);

  const handleSetFile = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.files?.length) [
      fileRef.current = e.target.files[0]
    ]
  }, [])

  return ({
    user,
    nftList,
    handleMint,
    handleMintNewNFT,
    handleSetFile,
  })
}

export default useInitMoralis