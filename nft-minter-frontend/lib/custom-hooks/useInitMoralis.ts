import mintNFT from "api/moralis/mintNFT";
import Moralis from "moralis";
import { useCallback, useEffect, useRef, useState } from "react"
import getAllNFTs, { SingleHandledNFTData } from "../../api/moralis/getAllNFTs";
import startMoralisAndGetCurrentUser from "../../api/moralis/startMoralis";
import MoralisHelpers from "../Handlers/MoralisHelpers";

const useInitMoralis = () => {
  const userAddress = useRef();
  const [user, setUser] = useState<Moralis.User<Moralis.Attributes>>();
  const [nftList, setNft] = useState<SingleHandledNFTData[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const _user = await startMoralisAndGetCurrentUser();
        const userAddress = MoralisHelpers.getAddressFromUser(_user);
        if(userAddress) {
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
      if(userAddress.current) {
        await mintNFT(userAddress.current)(1, 1);
      }
    })()   
  }, [])

  return ({
    user,
    nftList,
    handleMint,
  })
}

export default useInitMoralis