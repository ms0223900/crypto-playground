interface SingleFetchedAsset {
    name: string
    description: string
    token_id: string
    image_original_url: string
    image_preview_url: string
    token_metadata: string
    permalink: string
    traits: any[]
}

export interface FetchedAssetsRes {
    assets: SingleFetchedAsset[]
}

const fetchAssets = async (userAddress: string) => {
	const fetched = await (
        fetch(`https://api.opensea.io/api/v1/assets?owner=${userAddress}&order_direction=desc&offset=0&limit=20`).then(res => res.json()) as Promise<FetchedAssetsRes>
    );
	const parsed = fetched.assets.map(asset => ({
        token_id: asset.token_id,
        parsedMetadata: {
          name: asset.name,
          image: asset.image_preview_url,
          description: asset.description,
        },
    }))
    return parsed;
}

export default fetchAssets