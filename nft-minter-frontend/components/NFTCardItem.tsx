import { SingleParsedMetadata } from 'api/moralis/getAllNFTs'
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
      </div>
      <div>
        <input />
        <input />
        <button onClick={onMint}>
          {'Mint'}
        </button>
      </div>
    </div>
  )
}

export default memo(NFTCardItem)