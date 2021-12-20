import { ERC_721_TEST_CONTRACT_ADDRESS } from "config";
import MoralisHelpers from "lib/Handlers/MoralisHelpers";
import Moralis from "moralis";
import abi from '../../static/erc721_test_abi.json';

export interface MintERC721TokenOptions { 
    nftTokenId: number
    imgFile: File 
}

const mint721Token = (address: string) => async ({
    imgFile,
    nftTokenId,
  }: MintERC721TokenOptions) => {
    const web3 = await Moralis.Web3.enableWeb3();
    const contract = new web3.eth.Contract(abi as any, ERC_721_TEST_CONTRACT_ADDRESS, {
      gasPrice: '10000',
    });

    const uploadedRes = await MoralisHelpers.saveFileToMoralisIPFS(imgFile.name, imgFile);
    const imgPath = MoralisHelpers.getUploadedPathFromResult(uploadedRes);
    console.log(imgPath)

    const metadata = MoralisHelpers.makeImgMetaDataByPath({
        name: 'New NFT!!' + new Date().getTime(),
        description: 'HI!',
        imgPath,
    });
    const metaJSON = MoralisHelpers.makeImgMetaDataJSON(nftTokenId, metadata);
    const uploadedTokenRes = await MoralisHelpers.saveFileToMoralisIPFS(metaJSON.name, undefined as any, metaJSON.data.base64);
    const tokenURI = MoralisHelpers.getUploadedPathFromResult(uploadedTokenRes)
    console.log(tokenURI)

    
    // console.log(contract)
    contract.methods.mint(address, nftTokenId, tokenURI).send({
      from: address,
      value: 0,
    })
}

export default mint721Token