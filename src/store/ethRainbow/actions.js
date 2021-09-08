import { Contract, ethers } from 'ethers';
const base64 = require('base-64');

//import actions from '../ethers/actions'

const ETHRAINBOW_RINKEBY = "0x9a3285edce19cf60ecbe234d97139ba9b0835337";
const ETHRAINBOW_HOMESTEAD = "0xd85c10dd67339e5e68bf85312075271ad74f3e79";

const ETHRAINBOW = ETHRAINBOW_HOMESTEAD;
const ETHRAINBOW_ABI = require('./abi.json');

let ethRainbowContract;

let claimed = [];
let rainbowSVGs = {};

const createContract =  async function (context, wallet) {
    //console.log("createContract() with wallet:", wallet);

    if (claimed.length == 0) {
        for (let i=0; i<6000; i++) {
            claimed.push(false);
        }
    }
    //const wallet = actions.getWallet();
    if (wallet) {
        ethRainbowContract = new Contract(ETHRAINBOW, ETHRAINBOW_ABI, wallet);
        context.commit('ready', true);
        loadMyRainbows(context, await wallet.getAddress());
    } else {
        ethRainbowContract = null;
        context.commit('ready', false);
        context.commit('loadingRainbows', false);
        context.commit('myRainbows', []);
    } 
};

const checkOwned = async function (context, tokenId) {
    //console.log("checkOwned() with tokenId", tokenId);
    if (ethRainbowContract == null) return null;
    if (claimed[tokenId-1] == true ) { return true; }

    let owner = null;
    try {
        owner = await ethRainbowContract.ownerOf(tokenId);
    } catch (err) {
        claimed[tokenId-1] = false;
    }
    
    if (owner != null) { 
        //console.log(`Token owned: ${owner}`);
        claimed[tokenId-1] = true; }
    else { claimed[tokenId-1] = false; }

    context.commit('claimedTokens', claimed);

    return claimed[tokenId-1];
}

const claim = async function (context, tokenId) {
    //console.log("claim() with tokenId:", tokenId);
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

    loadMyRainbows();
    return true;
}

const loadMyRainbows = async function (context, address) {
    //console.log("loadMyRainbows() with address:", address);
    if (ethRainbowContract == null) return null;

    let myRainbows = [];

    for (let i=0; i<6000; i++) {
        context.commit('loadingRainbows', true);
        try {
            let rainbowId = await ethRainbowContract.tokenOfOwnerByIndex(address, i);
            myRainbows.push(rainbowId.toNumber());
        } catch (err) {
            break;
        }
    }

    context.commit("myRainbows", myRainbows);

    for (let r=0; r<myRainbows.length; r++) {
        context.commit('loadingRainbows', true);
        let tokenId = myRainbows[r];
        //console.log(tokenId);

        if (!(tokenId.toString() in rainbowSVGs)) {
            try {
                //console.log("finding URI...");
                let tokenData = await ethRainbowContract.tokenURI(parseInt(tokenId));
                let decodedData = base64.decode(tokenData.split(",")[1]);
                let JSONData = JSON.parse(decodedData);
                let imageData = JSONData.image;
                //let decodedImageData = base64.decode(imageData.split(",")[1]);
                rainbowSVGs[tokenId.toString()] = imageData;
            } catch (err) {}
        }
    };

    context.commit("rainbowSVGs", rainbowSVGs);
    context.commit('loadingRainbows', false);
    return true;
}


export default {
    createContract,
    checkOwned,
    claim,
    loadMyRainbows
}