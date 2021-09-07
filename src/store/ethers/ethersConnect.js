import Vue from 'vue';

import {
  providers,
  Contract as ContractModule,
  utils as utilsModule
} from 'ethers';

import ethers from '.'
import { getBalance, getMainBalance } from '../jigsaw/jigsawContract'


export const ENS_NETS = ['0x1', '0x3', '0x4']

// messages
export const MSGS = {
  NOT_CONNECTED: 'Not connected to Ethereum network',
  NOT_READY: 'Ethereum network not ready',
  NO_WALLET: 'No Ethereum wallet detected',
  ACCOUNT_CHANGED: 'Ethereum account changed',
  BALANCE_CHANGED: 'Ethereum balance changed',
  ETHERS_VUEX_INITIALIZED: 'Ethers vuex module initialized',
  ETHERS_VUEX_READY: 'Ethers vuex module ready'
}

export const ETHERS_CHANNEL = 'ethers';
export const ethersEvent = new Vue();

export const utils = utilsModule;
export const Contract = ContractModule;





// get the name of this network
export async function getNetName() {
  switch (chainId) {
    case '0x1':
      return 'Mainnet';
    case '0x2':
      return 'Morden (deprecated)';
    case '0x3':
      return 'Ropsten Test Network';
    case '0x4':
      return 'Rinkeby Test Network';
    case '0x5':
      return 'Goerli Test Network';
    case '0x2a':
      return 'Kovan Test Network';
    case '0x89':
      return 'Polygon Matic Mainnet Network';
    case '0x13881':
      return 'Polygon Mumbai Test Network';
    case undefined:
    case null:
      return 'No Chain!'
    default:
      return 'Unknown'
  }
}


// get deployed address for a contract from its networks object and current network id or null
export async function getNetworkAddress(networks) {
  if (!networks[chainId] || !networks[chainId].address) return null
  return networks[chainId].address
}




// stop interval looking for ethereum provider changes
export async function stopWatchProvider() {
  if (providerInterval) clearInterval(providerInterval)
  providerInterval = null
}