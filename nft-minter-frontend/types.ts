import { SingleParsedMetadata } from "api/moralis/getAllNFTs";

export type Callback = (...params: any) => any

export interface CommonNFTInfo {
    token_address: string
    token_id: string
    block_number_minted: string
    owner_of: string
    block_number: string
    amount: string
    contract_type: string // ERC1155...
    name: string
    symbol: string
    token_uri: string
    metadata: string
    synced_at: string // 2021-12-21T06:48:48.276Z
    is_valid: number // 1 or 0 ?
    syncing: number
    frozen: number
    parsedMetadata: SingleParsedMetadata | null
    meta: SingleParsedMetadata | null
}