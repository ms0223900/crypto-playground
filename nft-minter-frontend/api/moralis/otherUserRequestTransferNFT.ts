import { CONTRACT_OWNER_ADDRESS } from 'config'
import MoralisHelpers from 'lib/Handlers/MoralisHelpers'
import Moralis from 'moralis'
import { Contract } from 'web3-eth-contract/types'

type SafeTransferFromFn = (
    from: string,
    to: string,
    tokenId: number,
    amount: number,
    data: any,
) => any

const otherUserRequestTransferNFT = (contract: Contract, userAddress: string) => async (tokenId: number, amount = 1) => {
    try {
        console.log(CONTRACT_OWNER_ADDRESS);
        // const options = MoralisHelpers.makeExecuteFunctionOptions({
        //     functionName: 'safeTransferFrom',
        //     params: {
        //         from: CONTRACT_OWNER_ADDRESS,
        //         to: userAddress,
        //         id: tokenId,
        //         amount,
        //         data: 0,
        //     },
        // });
        const res = await (contract.methods.safeTransferFrom as SafeTransferFromFn)(
            CONTRACT_OWNER_ADDRESS,
            userAddress,
            tokenId,
            amount,
            0
        ).send({ from: userAddress, });
        console.log(res);
    } catch (error) {
        console.log(error);
    }
}

export default otherUserRequestTransferNFT