<template>
    <div id="selectedNFT" :style="selectedNFTStyle" @click="selectNFT()">
        <img id="spinner" src="img/spinner.svg" height="35" v-if="loading"/>
        <span v-if="!(loading)">{{selectedText}}</span>    
    </div>
    <div class="clickTo" v-if="(owned.length > 1) && !loading">Click to change</div>


    <div id="dim" :style="dimStyle" @click="close()"></div>
    <div id="nft-picker" :style="colorPickerStyle">
        <div id="nft-picker-title">{{NFTname}} Picker</div>
        <div id="nft-container">
            <div v-for="(tokenId, index) in owned" :key="index">
                <div class="nft-to-pick" :style="pickerNFTStyle(index)" @click="clickedNFT(index)"></div>
                <div class="small-title">{{NFTname}} #{{tokenId}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NFTPicker",
        props: { modelValue: String, nfts: Object, owned: Array, NFTname: String, loading: Boolean },
        data() {
            return {
                picker: false
            };
        },
        methods: {
            selectNFT() {
                if (this.owned.length > 0) {
                    this.picker = true;
                }
            },
            close() {
                this.picker = false;
            },
            clickedNFT(index) {
                this.$emit("update:modelValue", this.owned[index].toString());
                this.$emit("change");
                this.close();
            },
            pickerNFTStyle: function(index) { return `background-image: url(${this.nfts[this.owned[index]]}); border: 3px solid ${(this.modelValue == this.owned[index].toString())?"white":"#cecece"}`; }
        },
        computed: {
            dimStyle: function () { return (this.picker)?'display:block':'display:none'; },
            colorPickerStyle: function () { return (this.picker)?'display:block':'display:none'; },
            selectedNFTStyle: function() { return `background-image: url(${this.nfts[this.modelValue]})`; },
            selectedText: function() { return (this.modelValue == null)?`No valid ${this.NFTname}`:`${this.NFTname} #${this.modelValue}`}
        }
    };
</script>


<style scoped>

    #spinner {
        position: relative;
        right: 102px;
        bottom: 107px;
    }

    .small-title {
        font-size:12px;
        font-weight: 100;
    }

    .clickTo {
        font-size:18px;
        font-weight: 200;
    }

    #dim {
        position: fixed;
        background-color: rgba(0, 0, 0, 0.5);
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        z-index: 1000;
        transition: 1s;
    }

    #nft-picker {
        position: fixed;
        left: 50%;
        top: 50%;
        width: 500px;
        height: 600px;
        margin-left: -250px;
        margin-top: -300px;
        border-radius: 25px;
        z-index: 1001;
        background-color: #181818;
        filter: drop-shadow(2px 4px 6px black);
    }

    #nft-picker-title {
        margin-top: 20px;
        font-size: 24px;
    }

    #selectedNFT {
        width: 250px;
        height: 250px;
        border-radius: 20px;
        border: 10px solid white;
        margin: 3px;
        cursor: pointer;
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        background-color: black;
    }

    #selectedNFT span {
        font-size:15px;
        margin: 2px 5px;
    }

    #nft-container {
        display: flex;
        width: 480px;
        height: 533px;
        position: relative;
        left: 10px;
        top: 9px;
        border-radius: 25px;
        overflow-y: auto;
        overflow-x: hidden;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    .nft-to-pick {
        width: 100px;
        height: 100px;
        border: 4px solid white;
        margin: 25px 23px 8px 23px;
        cursor: pointer;
        float: left;
        border-radius: 6px;
    }
</style>