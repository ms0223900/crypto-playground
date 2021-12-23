import { SingleParsedMetadata } from 'api/moralis/getAllNFTs'
import Image from 'next/image';
import React, { memo } from 'react'
import { Callback } from 'types'

export interface NFTCardItemProps {
  metadata: SingleParsedMetadata | null
  onMint: Callback
}

const NFTCardItem = ({
  metadata,
  onMint,
}: NFTCardItemProps) => {
  if(!metadata) return null;
  return (
    <div>
      <div
      >
        <div>
          {metadata.name}
        </div>
        <div className={'max-w-xs'}>
          <img src={metadata.image} alt={'metadata-img'} />
        </div>
      </div>
      <div>
        <input className={'block'} />
        <input className={'block'} />
        <button className="btn btn-primary" onClick={onMint}>
          {'Mint'}
        </button>
      </div>
    </div>
  )
}

export default memo(NFTCardItem)