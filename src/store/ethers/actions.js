import {
  providers
} from 'ethers';

const PROVIDER_CHECK_MS = 500;

const HOMESTEAD = '0x1';
const RINKEBY = '0x4';

const supportedNetworkIds = [HOMESTEAD];

let ethereum;
let provider;
let chainId;
let wallet;
let currentAccount;
let providerInterval;

function getEthereum() {
  return window.ethereum;
}

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

  //console.log("startProviderWatcher()");

  async function updateProvider(context) {
    //console.log("updateProvider()");

      ethereum = getEthereum();
      if (!ethereum) return;

      provider = new providers.Web3Provider(ethereum);
      context.commit("provider", provider);
      //console.log("provider", provider);

      chainId = ethereum.chainId;
      //console.log("chainId", chainId);

      const accounts = await ethereum.request({ method: 'eth_accounts' });
      //console.log("accounts", accounts);
      handleAccountsChanged(context);

      ethereum.on('chainChanged', () => handleChainChanged(context));
      ethereum.on('accountsChanged', () => handleAccountsChanged(context));
  }

  function checkProvider(context) {
    //console.log("checkProvider()");
    //console.log("ethereum", ethereum);
    //console.log("ethereumOk()", ethereumOk());
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
  //console.log('Ethereum chain changed. Reloading as recommended.');
  chainId = _chainId;
  window.location.reload();
}

async function handleAccountsChanged(context) {
  //console.log(`handleAccountsChanged()`);

  let accounts = [];
  if (ethereum) {
    accounts = await ethereum.request({ method: 'eth_accounts' });
  }

  //console.log(accounts);

  if (accounts.length === 0) {
    //console.log('No ethereum accounts available');
    logout(context);
  } else if (accounts[0] !== currentAccount) {
    currentAccount = accounts[0];
    wallet = provider && provider.getSigner(currentAccount);
    login(context);
  }

  context.dispatch("ethRainbow/createContract", wallet, {root:true});
  context.dispatch("nRainbow/createContracts", wallet, {root:true});
}

async function connect(context) {
  //console.log("connect()");
  try {
    await window.ethereum.enable();
    if (!ethereum) { return logout(context); }
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    await handleAccountsChanged(context);
  } catch (err) {
    if (err.code === 4001) {
      //console.log('Please connect to Ethereum wallet');
      logout(context);
    } else {
      console.error('Error requesting Ethereum connection/accounts', err)
      logout(context);
    }
  }
}

async function login(context) {
  //console.log("login() with context", context);
  //try {
    const oldAddress = context.state.address;
    const oldNetwork = context.state.network;
    const address = await getWalletAddress();

    //console.log("chainId: ", chainId);
    //console.log("oldNetwork: ", oldNetwork);
    //console.log("address: ", address);
    //console.log("oldAddress: ", oldAddress);

    //console.log("provider: ", provider);
    //console.log("wallet: ", wallet);

    if (!provider) { disconnect(context); return; };
    if (!wallet) { logout(context); return; };

    context.commit("wallet", wallet);
    context.dispatch("ethRainbow/createContract", wallet, {root:true});
    context.dispatch("nRainbow/createContracts", wallet, {root:true});

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
  //console.log("login()");
  if (ready()) {
    //console.log(" > ready()");
    await login(context);
  } else  {
    //console.log(" > not ready()");
    await connect(context);
  }
  startProviderWatcher(context);
  context.commit('initialized', true);
};

const logout = function logout(context) {
  //console.log("logout()");

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
  //context.dispatch("nRainbow/createContract", null, {root:true});
};

export default {
  init,
  logout,

  getProvider: () => provider,
  getWallet: () => wallet
}