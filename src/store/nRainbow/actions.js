import { Contract, ethers } from 'ethers';
const base64 = require('base-64');


const NRAINBOW = "0x0CBC63748aA5C62848520DfC51a7b36325842994"; //"0xd85c10dd67339e5e68bf85312075271ad74f3e79";
//const NRAINBOW_CONTRACT_ABI = require('./abi.json');

const N = "0xE26655713Ac83d4d40158c17Ba06b0fA4F56d13E"; //homestead: "0x05a46f1E545526FB803FF974C790aCeA34D1f2D6";
const N_ABI = require('./n_abi.json');

let nRainbowContract;
let nContract;

let NsSVGs = {};

const createContracts =  async function (context, wallet) {
    //console.log("createContracts() with wallet:", wallet);

    if (wallet) {
        nContract = new Contract(N, N_ABI, wallet);
        //nRainbowContract = new Contract(NRAINBOW, NRAINBOW_CONTRACT_ABI, wallet);
        context.commit('ready', true);
        loadMyNs(context, await wallet.getAddress());
    } else {
        nRainbowContract = null;
        nContract = null;
        context.commit('ready', false);
        context.commit('loadingNs', false);
        context.commit('myNs', []);
    } 
};


const loadMyNs = async function (context, address) {
    //console.log("loadMyNs() with address:", address);
    if (nContract == null) return null;

    let myNs = [];

    for (let i=0; i<8888; i++) {
        context.commit('loadingNs', true);
        try {
            let nId = await nContract.tokenOfOwnerByIndex(address, i);
            myNs.push(nId.toNumber());
        } catch (err) {
            break;
        }
    }

    context.commit("myNs", myNs);

    for (let r=0; r<myNs.length; r++) {
        context.commit('loadingNs', true);
        let tokenId = myNs[r];
        //console.log(tokenId);

        if (!(tokenId.toString() in NsSVGs)) {
            try {
                //console.log("finding URI...");
                let tokenData = await nContract.tokenURI(parseInt(tokenId));
                let decodedData = base64.decode(tokenData.split(",")[1]);
                let JSONData = JSON.parse(decodedData);
                let imageData = JSONData.image;
                let decodedImageData = base64.decode(imageData.split(",")[1]);
                //console.log(imageData);
                NsSVGs[tokenId.toString()] = imageData;
            } catch (err) {}
        }
    };

    context.commit("NsSVGs", NsSVGs);
    context.commit('loadingNs', false);
    return true;
}


export default {
    createContracts,
    loadMyNs
}