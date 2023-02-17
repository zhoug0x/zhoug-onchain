import './style.css'
import { ethers } from 'ethers'

// true -> use browser wallet provider
// false -> use public ethers provider (may get rate-limited)
const USE_WALLET = false

const CONTRACT_ADDRESS = '0xAb24426Bf0bcA7758AbEE5ecD44284264B2358B0'
const CONTRACT_ABI = ['function zhoug() view returns (string)']

const main = async () => {
  // setup provider for getting onchain data
  let provider
  if (USE_WALLET) {
    if (!window.ethereum) {
      console.error('no browser wallet detected')
      alert('browser wallet required to run this')
      return
    }

    provider = new ethers.providers.Web3Provider(window.ethereum, 'goerli')
    await provider.send('eth_requestAccounts', [])
  }
  provider = ethers.getDefaultProvider('goerli')

  // fetch onchain image of zhoug
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider)
  const zhougResult = await contract.zhoug()

  // update the page with the image
  const outputImg = document.createElement('img')
  outputImg.src = zhougResult
  document.getElementById('app').append(outputImg)
}

main()
