import Moralis from 'moralis'

const serverUrl = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL
const appId = process.env.NEXT_PUBLIC_MORALIS_APP_ID

const startMoralisAndGetCurrentUser = async () => {
  await Moralis.start({
    serverUrl,
    appId,
  });

  let user = Moralis.User.current();
  if(!user) {
    user = await Moralis.Web3.authenticate();
  }
  console.log(user)
  return user;
}

export default startMoralisAndGetCurrentUser