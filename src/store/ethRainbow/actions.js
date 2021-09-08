import { Contract, ethers } from 'ethers';
//import actions from '../ethers/actions'

const ETHRAINBOW = "0xd85c10dd67339e5e68bf85312075271ad74f3e79";
const FACTORY_CONTRACT_ABI = require('./abi.json');

let ethRainbowContract;

let claimed = [];

const createContract =  async function (context, wallet) {
    console.log("createContract() with wallet:", wallet);

    if (claimed.length == 0) {
        for (let i=0; i<6000; i++) {
            claimed.push(false);
        }
    }
    //const wallet = actions.getWallet();
    if (wallet) {
        ethRainbowContract = new Contract(ETHRAINBOW, FACTORY_CONTRACT_ABI, wallet);
        context.commit('ready', true);
    } else {
        ethRainbowContract = null;
        context.commit('ready', false);
    } 
};

const checkOwned = async function (context, tokenId) {
    console.log("checkOwned() with tokenId", tokenId);
    if (ethRainbowContract == null) return null;
    if (claimed[tokenId-1] == true ) { return true; }

    let owner = null;
    try {
        owner = await ethRainbowContract.ownerOf(tokenId);
    } catch (err) {
        claimed[tokenId-1] = false;
    }
    
    if (owner != null) { 
        console.log(`Token owned: ${owner}`);
        claimed[tokenId-1] = true; }
    else { claimed[tokenId-1] = false; }

    context.commit('claimedTokens', claimed);

    return claimed[tokenId-1];
}

const claim = async function (context, tokenId) {

    if (ethRainbowContract == null) return null;
    if (claimed[tokenId-1] == true ) { return null; }

    let tx;

    try {
        tx = await ethRainbowContract.claim(tokenId);
    } catch (_) {
        return null;
    }

    try {
        await tx.wait();
    } catch (_) {
        return null;
    }

    return true;
}

export default {
    createContract,
    checkOwned,
    claim
}