import { CONTRACT_ADDRESS } from 'config';
import Moralis from 'moralis';
import abi from '../../static/abi.json';

const initContract = async () => {
    const web3 = await Moralis.Web3.enableWeb3();
    const contract = new web3.eth.Contract(abi as any, CONTRACT_ADDRESS);
    console.log(contract);
    return contract;
}

export default initContract