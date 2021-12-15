import { SingleParsedMetadata } from 'api/moralis/getAllNFTs'
import React, { memo } from 'react'
import { Callback } from 'types'

export interface NFTCardItemProps {
  metadata: SingleParsedMetadata
  onMint: Callback
}

const NFTCardItem = ({
  onMint,
}: NFTCardItemProps) => {
  return (
    <div>
      <div>

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