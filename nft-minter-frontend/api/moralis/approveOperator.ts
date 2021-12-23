import { CONTRACT_ADDRESS } from 'config';
import MoralisHelpers from 'lib/Handlers/MoralisHelpers';
import Moralis from 'moralis';
import { Callback } from 'types';
import { Contract } from 'web3-eth-contract/types'
import abi from '../../static/abi.json';

type SetApprovalForAllFn = (
    addressForApproved: string,
    approved: boolean
) => any

// 為token的持有者「認可」其他地址的使用者
// e.g. A使用者要認可B使用者，讓B可以自由transfer A的token，則須由A先藉由以下函式認可B，B才能進行後續操作
const approveOtherUser = async (contract: Contract, otherUserAddress: string, approved = true, onError?: Callback) => {
    try {        
        const options: Moralis.ExecuteFunctionOptions = MoralisHelpers.makeExecuteFunctionOptions({
            functionName: 'setApprovalForAll',
            params: {
                operator: otherUserAddress,
                approved,
            } ,
        })
        const executed = await Moralis.Web3.executeFunction(options);
        console.log(executed);
    } catch (error) {
        console.log(error);
        onError && onError(error);
    }
}

export default approveOtherUser;