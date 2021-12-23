import { CONTRACT_ADDRESS } from "config"
import Moralis, { } from "moralis"

// only transfer nft from owner
const transferNFT = async (tokenId: number, toAddress: string) => {
    const options: Moralis.TransferOptions = {
        type: 'erc1155',
        receiver: toAddress,
        contractAddress: CONTRACT_ADDRESS,
        tokenId,
        amount: '1',
    }
    const res = await Moralis.Web3.transfer(options)
    console.log(res)
}

export default transferNFT