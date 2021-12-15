import Moralis from 'moralis';
import abi from '../../static/abi.json';

const ADDRESS = "0x5227013f0af53e3ff720b768e90d688c8801f853"

const mintNFT = (address: string) => async (nftTokenId: number, amount: number) => {
  const web3 = await Moralis.Web3.enableWeb3();
  const contract = new web3.eth.Contract(abi as any, ADDRESS, {
    gasPrice: '10',
  });
  console.log(contract)
  contract.methods.mint(address, nftTokenId, amount).send({
    from: address,
    value: 0,
  })
}

export default mintNFT;