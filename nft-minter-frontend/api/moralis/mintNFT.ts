import Moralis from 'moralis/types';
import initContract from './initContract';
import { Contract } from 'web3-eth-contract/types'

const mintNFT = (contract: Contract, address: string) => async ({
  nftTokenId, amount,
}: { nftTokenId: number, amount: number }) => {
  contract.methods.mint(address, nftTokenId, amount).send({
    from: address,
    value: 0,
  })
}

export default mintNFT;