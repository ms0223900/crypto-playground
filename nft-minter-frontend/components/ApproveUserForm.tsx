import { Box, Paper } from '@mui/material'
import approveOtherUser from 'api/moralis/approveOperator'
import initContract from 'api/moralis/initContract'
import useSimpleForm from 'lib/custom-hooks/useSimpleForm'
import React, { memo } from 'react'
import { useEffect } from 'react'
import { useCallback } from 'react'
import { useRef } from 'react'

export const useApproveUser = () => {
    const contract = useRef<any | undefined>()
    const {
        formState,
        handleChange,
        handleResetForm,
    } = useSimpleForm<{ 'other-user-address': string }>({
        'other-user-address': '0xe998E57193fA7215546c3a45576D52A9940f1f80',
    })

    const handleApproveUser = useCallback(() => {
        const address = formState['other-user-address'];
        if(contract.current && address) {
            console.log(contract.current, address)
            approveOtherUser(contract.current, address);
            // handleResetForm();
        }
    }, [JSON.stringify(formState)])

    useEffect(() => {
        (async () => {
            contract.current = await initContract();
        })()
    }, [])

    return ({
        formState,
        handleChange,
        handleApproveUser,
    })
}

const ApproveUserForm = () => {
    const {
      formState,
      handleChange,
      handleApproveUser,
    } = useApproveUser()

    return (
        <Box paddingY={1}>
            <Paper>
                <h2 className={'text-lg'}>{'Approve Other User'}</h2>
                <input 
                    className={'block basic-input'}
                    placeholder={'user address waited for approved'}
                    name={'other-user-address'}
                    value={formState['other-user-address']}
                    onChange={handleChange}
                />
                <button
                    className={'btn btn-primary'}
                    onClick={handleApproveUser}
                >
                    {'Approve User'}
                </button>
            </Paper>
      </Box>
  )
}

export default memo(ApproveUserForm)