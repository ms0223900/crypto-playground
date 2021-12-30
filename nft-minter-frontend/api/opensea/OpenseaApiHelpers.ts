import { OpenSeaApiPathEnum, OpenSeaChainEnum } from "./types"

const OpenseaApiHelpers = {
    getApiByChain: (chain: OpenSeaChainEnum) => (
        chain === OpenSeaChainEnum.MAIN ? 'https://api.opensea.io/api/v1/' : 'https://testnets-api.opensea.io/'
    ),
    
    makeApi(chain: OpenSeaChainEnum, params: Record<string, string | number>, apiPath = OpenSeaApiPathEnum.ASSETS) {
        const basicApi = `${this.getApiByChain(chain)}${apiPath}`;
        if(!Object.keys(params).length) return basicApi;
        
        let paramValList: string[] = []
        for (const [param, val] of Object.entries(params)) {
            paramValList.push(`${param}=${val}`);
        }
        const res = `${basicApi}?${paramValList.join('&')}`;
        return res;
    },
}

export default OpenseaApiHelpers