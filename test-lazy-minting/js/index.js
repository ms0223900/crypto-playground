import { MORALIS_CONFIG } from './env.js'

let user;

const elements = {
  app: document.getElementById('app'),
  imgInput: document.getElementById('input_image'),
  nameInput: document.getElementById('input_name'),
  descpInput: document.getElementById('input_description'),
  successMessage: document.getElementById('success_message'),
  submitBtn: document.getElementById('submit_button'),
}

const UI_UPDATER = {
  updateSuccessMessage: ({ tokenAddress, tokenId, }) => {
    elements.successMessage.innerHTML = `NFT minted. <a href="https://rinkeby.rarible.com/token/${tokenAddress}:${tokenId}">View NFT</a>`;
  },

  showSuccessMessage: () => {
    elements.successMessage.style.visibility = 'visible';
    setTimeout(() => {
      elements.successMessage.style.visibility = 'hidden';
    }, 5000)
  }
}

async function startMoralis() {
  Moralis.start({
    ...MORALIS_CONFIG,
  });
  user = Moralis.User.current();
}

const MoralisHelpers = {
  makeImgMetaData: ({
    name, description, imgHash,
  }) => ({
    name,
    description,
    image: `/ipfs/${imgHash}`
  }),

  saveFileToMoralis: async (dataName, data) => {
    const file = new Moralis.File(dataName, data);
    await file.saveIPFS();
    const hash = file.hash();
    return hash;
  },

  makeImgMetaDataJSON: (imgMetaData) => ({
    name: 'metadata.json',
    data: { base64 : btoa(JSON.stringify(imgMetaData)) },
  }),

  async uploadImgAndLazyMint({
    imgDataFile,
    name,
    description,
    userAddress,
  }) {
    const imgHash = await this.saveFileToMoralis(imgDataFile.name, imgDataFile);
    const imgMetaData = this.makeImgMetaData({
      name, description, imgHash,
    });
    const metaJSON = this.makeImgMetaDataJSON(imgMetaData)
    const {
      hash: metadataHash,
    } = await this.saveFileToMoralis(
      metaJSON.name,
      metaJSON.data,
    );
    await Moralis.Plugins.rarible.lazyMint({
      chain: 'rinkeby',
      userAddress,
      tokenType: 'ERC721',
      tokenUri: `ipfs://${metadataHash}`,
      royaltiesAmount: 5,
    });
  },
};

const handleSubmit = async () => {
  const data = elements.imgInput.files[0];
  if(!data) {
    window.alert('please upload data.');
    return;
  }
  const name = elements.nameInput.value;
  const description = elements.descpInput.value;
  if(name && description && user) {
    const userAddress = user.get('ethAddress');
    const res = await MoralisHelpers.uploadImgAndLazyMint({
      imgDataFile: data,
      name,
      description,
      userAddress,
    });
    const {
      tokenAddress,
      tokenId,
    } = res.result.data; // result format not affirmed...?
    UI_UPDATER.updateSuccessMessage({
      tokenAddress, tokenId,
    });
    UI_UPDATER.showSuccessMessage();
  }
}

function init() {
  elements.app.style.display = 'block';
  elements.submitBtn.addEventListener('click', handleSubmit);
}

const loginMoralis = async () => {
  await startMoralis();
  if(!user) {
    try {
      user = await Moralis.authenticate({ signingMessage: "Hi" });
      init();
    } catch (error) {
      console.log(error)
    }
  } else {
    Moralis.enableWeb3();
    init();
  }
};

function main() {
  (async() => {
    await loginMoralis();
  })();
}

main();
