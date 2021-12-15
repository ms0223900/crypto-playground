import Moralis from "moralis"

const MoralisHelpers = {
  getAddressFromUser: (user: Moralis.User<Moralis.Attributes>) => {
    const res = Array.isArray(user.attributes.accounts) ? user.attributes.accounts[0] : undefined;
    return res;
  },
}

export default MoralisHelpers