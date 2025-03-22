const { log } = require('console')
const ethers = require('ethers')
const fs = require('fs')
require('dotenv').config()

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)


const contractAddress = "0x2e1342Ad8327555E310dC62298949E404b064305"; //Deployed contract address
const slotIndex = ethers.toBeHex(1); // Storage slot 0

async function main(){

   const balance = await provider.getBalance(process.env.PUBLIC_KEY)
   log(balance)

   const block = await provider.getBlock()
   log(block)

   const blockNumber = await provider.getBlockNumber()
   log(blockNumber)

   const code = await provider.getCode(process.env.PUBLIC_KEY)
   log(code)

   const dataFeed = await provider.getFeeData()
   log(dataFeed)


   //Allows you to fetch past events from the Ethereum blockchain by filtering logs. Logs are emitted by smart contracts when they execute events.
   const logs = await provider.getLogs({
        address: contractAddress,
        fromBlock: 0, // Start block
        toBlock: "latest"    // End block
    })
   log(logs)

   const network = await provider.getNetwork()
   log(network)

   
   const storage = await provider.getStorage(contractAddress, slotIndex)
   log(storage)

   const txHash = '0xfa5ad2a7c20771706071e567db6c83137bfe8b3854eafb54c173d05b813343c6' //Transaction Hash
   const getTx = await provider.getTransaction(txHash)
   log(getTx)

   
   const blockTag = 2
   const txCount = await provider.getTransactionCount(process.env.PUBLIC_KEY, blockTag)
   log(txCount)

   // Retrieves the receipt of a transaction, which includes details like gas usage, logs, and status (success or failure). Line 54 and 57 returns the same things
   const receipt = await provider.getTransactionReceipt(txHash);
   console.log(receipt);
   
   const receiptTx = await provider.waitForTransaction(txHash);
   // console.log("✅ Transaction mined! Receipt:", receiptTx);

   const tx = {
      to: "0x17FB36F4FC9F35f3F433cE888fAaf58E440806Eb", // Receiver's address
      value: ethers.parseEther("0.1"), // Sending 0.1 ETH
  };
   const gas = await provider.estimateGas(tx)
   log(gas)

   // const call = await provider.call(tx)
   // log(call)

   


}

main()