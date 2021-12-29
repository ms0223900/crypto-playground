import { ERC_721_TEST_CONTRACT_ADDRESS } from "config";
import MoralisHelpers, { BasicMetadata, ImgMetadataParams } from "lib/Handlers/MoralisHelpers";
import Moralis from "moralis";
import abi from '../../static/erc721_test_abi.json';
import uploadImageAndMetadata from "./uploadImageAndMetadata";

export type MintERC721TokenMetadataOptions = Partial<Pick<ImgMetadataParams, 'name' | 'description'>>

export interface MintERC721TokenOptions { 
    nftTokenId: number
    imgFile: File
    metadataOptions?: MintERC721TokenMetadataOptions
}

const mint721Token = (address: string) => async (options: MintERC721TokenOptions) => {
    // const web3 = await Moralis.Web3.enableWeb3();
    // const contract = new web3.eth.Contract(abi as any, ERC_721_TEST_CONTRACT_ADDRESS, {
    //   gasPrice: '10000',
    // });

    const tokenURI = await uploadImageAndMetadata(options)

    // console.log(contract)
    // contract.methods.mint(address, nftTokenId, tokenURI).send({
    //   from: address,
    //   value: 0,
    // })
    return tokenURI;
}

export default mint721Token