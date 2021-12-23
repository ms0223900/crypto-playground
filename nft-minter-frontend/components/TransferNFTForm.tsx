import { Box } from '@mui/material'
import initContract from 'api/moralis/initContract'
import otherUserRequestTransferNFT from 'api/moralis/otherUserRequestTransferNFT'
import transferNFT from 'api/moralis/transferNFT'
import useSimpleForm from 'lib/custom-hooks/useSimpleForm'
import React, { memo, MutableRefObject, useCallback, useEffect, useRef } from 'react'

type TransferNFTFormInputName = 'TOKEN_ID' | 'TOKEN_AMOUNT'
export interface UseTransferNFTFormOptions {
  userAddress: MutableRefObject<string | undefined>
}
export interface TransferNFTFormProps extends UseTransferNFTFormOptions {
  
}

export const useTransferNFTForm = ({
  userAddress,
}: UseTransferNFTFormOptions) => {
  const contract = useRef<any | undefined>()
  const {
    formState,
    handleChange,
  } = useSimpleForm<Record<TransferNFTFormInputName, number>>({
    TOKEN_ID: 1,
    TOKEN_AMOUNT: 1,
  });

  const handleTransfer = useCallback(() => {
    console.log(formState);
    if(contract.current && formState.TOKEN_AMOUNT && formState.TOKEN_ID && userAddress.current) {
      otherUserRequestTransferNFT(contract.current, userAddress.current)(formState.TOKEN_ID, formState.TOKEN_AMOUNT)
    } 
  }, [JSON.stringify(formState), userAddress])

  useEffect(() => {
      (async () => {
          contract.current = await initContract();
      })()
  }, [])

  return ({
    formState,
    handleChange,
    handleTransfer,
  })
}

const TransferNFTForm = (props: TransferNFTFormProps) => {
  const {
    formState,
    handleChange,
    handleTransfer,
  } = useTransferNFTForm(props)

  return (
    <Box paddingY={1}>
      <h2>{'Transfer NFT'}</h2>
      <div onSubmit={e => {}}>
        <input 
            className={'block basic-input'}
            placeholder={'nft token id'}
            type={'number'}
            value={formState.TOKEN_ID}
            onChange={handleChange}
        />
        <input 
            className={'block basic-input'}
            placeholder={'nft amount'}
            type={'number'}
            value={formState.TOKEN_AMOUNT}
            onChange={handleChange}
        />
        <button
          className={'btn btn-primary'}
          onClick={handleTransfer}
        >
          {'Transfer!'}
        </button>
      </div>
    </Box>
  )
}

export default memo(TransferNFTForm)