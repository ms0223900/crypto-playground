import { Paper } from '@mui/material';
import { SingleParsedMetadata } from 'api/moralis/getAllNFTs'
import Image from 'next/image';
import React, { memo } from 'react'
import { Callback, CommonNFTInfo } from 'types'

export interface NFTCardItemProps {
  commonTokenInfo: CommonNFTInfo
  metadata: SingleParsedMetadata | null
  onMint: Callback
}

const NFTCardItem = ({
  commonTokenInfo,
  metadata,
  onMint,
}: NFTCardItemProps) => {
  if(!metadata) return null;
  const {
    amount,
    owner_of,
  } = commonTokenInfo
  return (
    <Paper
      className={'p-1 m-1 w-1/4'}
      elevation={2}
    >
      <div
      >
        <div>
          {metadata.name}
        </div>
        <div>
          <img className={'h-60 w-auto'} src={metadata.image} alt={'metadata-img'} />
        </div>
        <p>{`Owner: ${owner_of}`}</p>
        <p>{`Amount: ${amount}`}</p>
      </div>
      <div>
        <input className={'block'} />
        <input className={'block'} />
        <button className="btn btn-primary" onClick={onMint}>
          {'Mint'}
        </button>
      </div>
    </Paper>
  )
}

export default memo(NFTCardItem)