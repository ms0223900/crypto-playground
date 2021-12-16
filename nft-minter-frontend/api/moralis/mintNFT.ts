import { CONTRACT_ADDRESS } from 'config';
import Moralis from 'moralis';
import abi from '../../static/abi.json';

const mintNFT = (address: string) => async ({
  nftTokenId, amount,
}: { nftTokenId: number, amount: number }) => {
  const web3 = await Moralis.Web3.enableWeb3();
  const contract = new web3.eth.Contract(abi as any, CONTRACT_ADDRESS, {
    gasPrice: '10000',
  });
  console.log(contract)
  contract.methods.mint(address, nftTokenId, amount).send({
    from: address,
    value: 0,
  })
}

export default mintNFT;