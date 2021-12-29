import { Contract } from 'web3-eth-contract/types'
import Moralis from 'moralis';
import MoralisHelpers from 'lib/Handlers/MoralisHelpers';

type OpenBlindBoxFn = (tokenId: number) => any

const openBlindBox = (contract: Contract) => async (tokenId: number) => {
    try {
        const options: Moralis.ExecuteFunctionOptions = MoralisHelpers.makeExecuteFunctionOptions({
            functionName: 'openBlindBox',
            params: {
                id: tokenId,
            },
        })
        const executed = await Moralis.Web3.executeFunction(options);
        console.log(executed);
    } catch (error) {
        console.log(error);
    }
}

export default openBlindBox