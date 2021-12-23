import React, { memo } from 'react'
import { Box } from '@mui/material'
import { Callback } from 'types'

export interface MintNewERC721NFTFormProps {
    handleSetFile: Callback
    handleChangeMintInputState: Callback
    handleMintNewNFT: Callback
  }
  
const MintNewERC721NFTForm = ({
    handleSetFile,
    handleChangeMintInputState,
    handleMintNewNFT,
}: MintNewERC721NFTFormProps) => {
    return (
        <div className={'pt-4'}>
            <input 
                className={'block'}
                name={'name'}
                placeholder={'New NFT Name'}
                onChange={handleChangeMintInputState}
            />
            <input 
                className={'block'}
                name={'description'}
                placeholder={'New NFT Description'}
                onChange={handleChangeMintInputState}
            />
            <label
                className={'block'}
            >
                {'Upload file for new NFT.'}
            <input 
                type="file"
                onChange={handleSetFile}
            />
            </label>
            <button className="btn btn-primary" onClick={handleMintNewNFT}>
                {'Mint a New NFT!'}
            </button>
        </div>
    )
}

export default memo(MintNewERC721NFTForm)