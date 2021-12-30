export enum OpenSeaChainEnum {
    MAIN = 'MAIN',
    TEST = 'TEST'
}

export enum OpenSeaApiPathEnum {
    ASSET = 'asset',
    ASSETS = 'assets'
}

export enum OpenSeaApiQueryOrderDirectionEnum {
    ASC = 'asc',
    DESC = 'desc'
}


export interface SingleFetchedAsset {
    name: string
    description: string
    token_id: string
    image_original_url: string
    image_preview_url: string
    token_metadata: string
    permalink: string
    traits: any[]
}