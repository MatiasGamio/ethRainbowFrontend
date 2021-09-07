import {
  providers
} from 'ethers';

const PROVIDER_CHECK_MS = 500;

const supportedNetworkIds = ['0x4'];

let ethereum;
let provider;
let chainId;
let wallet;
let currentAccount;
let providerInterval;

function getEthereum() { return window.ethereum; }

function ethereumOk() {
  const em = getEthereum();
  return em && em.isConnected();
}

async function getWalletAddress() {
  const addr = wallet && await wallet.getAddress();
  return addr;
}

export function ready() {
  return !!provider && !!wallet;
}

async function startProviderWatcher(context) {
  async function updateProvider(context) {
    try {
      ethereum = getEthereum();
      if (!ethereum) return;

      provider = new providers.Web3Provider(ethereum);
      context.commit("provider", provider);

      chainId = ethereum.chainId;
      ethereum.on('chainChanged', handleChainChanged);

      handleAccountsChanged(context);
      ethereum.on('accountsChanged', () => handleAccountsChanged(context));

    } catch (err) {
      console.error('Error requesting ethereum accounts', err)
      ethersEvent.$emit(ETHERS_CHANNEL, MSGS.NO_WALLET)
    }
  }

  function checkProvider(context) {
    if (ethereum && !ethereumOk()) {
      logout(context);
    } else if (!ethereum && ethereumOk()) {
      updateProvider(context);
    }
  }

  checkProvider(context);
  providerInterval = setInterval(checkProvider(context), PROVIDER_CHECK_MS);
}

function handleChainChanged(_chainId) {
  console.log('Ethereum chain changed. Reloading as recommended.');
  chainId = _chainId;
  window.location.reload();
}

async function handleAccountsChanged(context, accounts) {

  console.log(`handleAccountsChanged()`);

  if (!accounts) {
    accounts = await ethereum.request({ method: 'eth_accounts' });
  }

  console.log(accounts);

  if (accounts.length === 0) {
    console.log('No ethereum accounts available');
    logout(context);
  } else if (accounts[0] !== currentAccount) {
    currentAccount = accounts[0];
    wallet = provider && provider.getSigner(currentAccount);
    login(context);
  }

  context.dispatch("ethRainbow/createContract", wallet, {root:true});
}

async function connect(context) {
  console.log("connect()");
  try {
    if (!ethereum) { return logout(context); }
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    await handleAccountsChanged(context, accounts);
  } catch (err) {
    if (err.code === 4001) {
      console.log('Please connect to Ethereum wallet');
      logout(context);
    } else {
      console.error('Error requesting Ethereum connection/accounts', err)
      logout(context);
    }
  }
}

async function login(context) {
  console.log("login() with context", context);
  //try {
    const oldAddress = context.state.address;
    const oldNetwork = context.state.network;
    const address = await getWalletAddress();

    console.log("chainId: ", chainId);
    console.log("oldNetwork: ", oldNetwork);
    console.log("address: ", address);
    console.log("oldAddress: ", oldAddress);

    console.log("provider: ", provider);
    console.log("wallet: ", wallet);

    if (!provider) { disconnect(context); return; };
    if (!wallet) { logout(context); return; };

    context.commit("wallet", wallet);
    context.dispatch("ethRainbow/createContract", wallet, {root:true});

    if (chainId !== oldNetwork || address !== oldAddress) {
      context.commit('connected', true);
      context.commit('address', address);
      
      if (supportedNetworkIds.includes(chainId)) {
        context.commit('networkOk', true);
      } else {
        context.commit('networkOk', false);
      }
    }
  //} catch (err) {
  //  disconnect(context);
  //}
}

const init =  async function (context) {
  if (ready()) {
    await login(context);
  } else  {
    await connect(context);
  }
  startProviderWatcher(context);
  context.commit('initialized', true);
};

const logout = function logout(context) {
  console.log("logout()");

  const oldAddress = context.state.address;
  context.commit('address', '');
  context.commit('wallet', null);
  if (provider && oldAddress) {
    provider.off(oldAddress);        
  }

  ethereum = null;
  provider = null;
  chainId = null;
  currentAccount = null;
  wallet = null;
  clearInterval(providerInterval);
  
  context.commit('connected', false);
  context.commit('provider', null);
  context.dispatch("ethRainbow/createContract", null, {root:true});
};

export default {
  init,
  logout,

  getProvider: () => provider,
  getWallet: () => wallet
}