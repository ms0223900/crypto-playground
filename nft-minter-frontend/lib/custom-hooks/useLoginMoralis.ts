import mintNFT from "api/moralis/mintNFT";
import Moralis from "moralis";
import { useEffect, useState } from "react"
import getAllNFTs from "../../api/moralis/getAllNFTs";
import startMoralisAndGetCurrentUser from "../../api/moralis/startMoralis";
import MoralisHelpers from "../Handlers/MoralisHelpers";

const useLoginMoralis = () => {
  const [user, setUser] = useState<Moralis.User<Moralis.Attributes>>();
  const [nftList, setNft] = useState<any[]>();

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
  }, [])

  return ({
    user,
    nftList,
  })
}

export default useLoginMoralis