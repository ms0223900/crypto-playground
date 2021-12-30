// doc: https://docs.opensea.io/reference/getting-assets

import OpenseaApiHelpers from "./OpenseaApiHelpers"
import { OpenSeaApiPathEnum, OpenSeaApiQueryOrderDirectionEnum, OpenSeaChainEnum, SingleFetchedAsset } from "./types"

export interface FetchAssetsOptions {
    chain: OpenSeaChainEnum
    queryParams: {
        owner?: string // owner address
        offset?: number
        limit?: number
        order_direction?: OpenSeaApiQueryOrderDirectionEnum
    }
}


export interface FetchedAssetsRes {
    assets: SingleFetchedAsset[]
}

const fetchAssets = async ({
    chain, queryParams,
}: FetchAssetsOptions) => (
    fetch(`${OpenseaApiHelpers.makeApi(chain, queryParams, OpenSeaApiPathEnum.ASSETS)}`).then(res => res.json()) as Promise<FetchedAssetsRes>
)

export default fetchAssets