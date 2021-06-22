/* eslint no-use-before-define: "warn" */
const fs = require("fs");
const chalk = require("chalk");
const { config, ethers } = require("hardhat");
const { utils } = require("ethers");
const R = require("ramda");
const ipfsAPI = require('ipfs-http-client');
const ipfs = ipfsAPI({host: 'ipfs.infura.io', port: '5001', protocol: 'https' })

const delayMS = 1000 //sometimes xDAI needs a 6000ms break lol 😅

const main = async () => {

  // ADDRESS TO MINT TO:
  const toAddress = "0x45f6ae768936A99b083eac56495feFfb7cE07148"

  console.log("\n\n 🎫 Minting to "+toAddress+"...\n");

  const yourContract = await ethers.getContractAt('YourContract', fs.readFileSync("./artifacts/YourContract.address").toString())


  const NFT = {
    "description": "QQ",
    "external_url": "https://appadvice.com/app/chubby-kitten-animated-sticker/1313127121",// <-- this can link to a page for the specific file too
    "image": "https://is2-ssl.mzstatic.com/image/thumb/Purple128/v4/21/41/cd/2141cd14-8256-38e5-2a7c-93c2d02040da/source/512x512bb.jpg",
    "name": "qqqqqqq",
    "attributes": [
       {
         "trait_type": "BackgroundColor",
         "value": "blue"
       },
       {
         "trait_type": "Eyes",
         "value": "small"
       },
       {
         "trait_type": "Stamina",
         "value": 20
       }
    ]
  }
  console.log("Uploading NFT...")
  const uploaded = await ipfs.add(JSON.stringify(NFT))

  console.log("Minting NFT with IPFS hash ("+uploaded.path+")")
  await yourContract.mintItem(toAddress,uploaded.path,{gasLimit:400000})


  await sleep(delayMS)



  /*


  console.log("Minting zebra...")
  await yourCollectible.mintItem("0xD75b0609ed51307E13bae0F9394b5f63A7f8b6A1","zebra.jpg")

  */


  //const secondContract = await deploy("SecondContract")

  // const exampleToken = await deploy("ExampleToken")
  // const examplePriceOracle = await deploy("ExamplePriceOracle")
  // const smartContractWallet = await deploy("SmartContractWallet",[exampleToken.address,examplePriceOracle.address])



  /*
  //If you want to send value to an address from the deployer
  const deployerWallet = ethers.provider.getSigner()
  await deployerWallet.sendTransaction({
    to: "0x34aA3F359A9D614239015126635CE7732c18fDF3",
    value: ethers.utils.parseEther("0.001")
  })
  */


  /*
  //If you want to send some ETH to a contract on deploy (make your constructor payable!)
  const yourContract = await deploy("YourContract", [], {
  value: ethers.utils.parseEther("0.05")
  });
  */


  /*
  //If you want to link a library into your contract:
  // reference: https://github.com/austintgriffith/scaffold-eth/blob/using-libraries-example/packages/hardhat/scripts/deploy.js#L19
  const yourContract = await deploy("YourContract", [], {}, {
   LibraryName: **LibraryAddress**
  });
  */

};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
