import { Box, TextField } from '@mui/material'
import initContract from 'api/moralis/initContract'
import otherUserRequestTransferNFT from 'api/moralis/otherUserRequestTransferNFT'
import transferNFT from 'api/moralis/transferNFT'
import useSimpleForm from 'lib/custom-hooks/useSimpleForm'
import React, { memo, MutableRefObject, useCallback, useEffect, useRef } from 'react'

enum TransferNFTFormInputNameEnum {
  'TOKEN_ID' = 'TOKEN_ID',
  'TOKEN_AMOUNT' = 'TOKEN_AMOUNT'
}
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
  } = useSimpleForm<Record<TransferNFTFormInputNameEnum, number>>({
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
      <div className={'mt-4'} onSubmit={e => {}}>
        <label
          className={'m-1'}
        >
          <TextField
              label={'nft token id'}
              placeholder={'nft token id'}
              type={'number'}
              value={formState.TOKEN_ID}
              name={TransferNFTFormInputNameEnum.TOKEN_ID}
              onChange={handleChange}
          />
        </label>
        <label
          className={'m-1'}
        >
          <TextField 
              label={'nft amount'}
              placeholder={'nft amount'}
              type={'number'}
              value={formState.TOKEN_AMOUNT}
              name={TransferNFTFormInputNameEnum.TOKEN_AMOUNT}
              onChange={handleChange}
          />
        </label>
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