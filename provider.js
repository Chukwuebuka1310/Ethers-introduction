const { log } = require('console')
const ethers = require('ethers')
const fs = require('fs')
require('dotenv').config()

//Provides a connection to a blockchain. TheRPC (Remote Procedure Call) URL is an endpoint that enables an application to communicate with a blockchain network
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)


const contractAddress = "0x2e1342Ad8327555E310dC62298949E404b064305"; //Deployed contract address
const slotIndex = ethers.toBeHex(1); // Storage slot 1

async function main(){

   //Get the balance of the address provided (process.env.PUBLIC_KEY)
   const balance = await provider.getBalance(process.env.PUBLIC_KEY)
   log(balance)

   //Retrieves details of a specific Ethereum block using either blocknumber, blockHash, blockTag(latest, pending, earliest)
   const block = await provider.getBlock('latest')
   log(`Block: ${block}`)

   //Returns the latest block number on the Ethereum network.
   const blockNumber = await provider.getBlockNumber()
   log(`Block Number: ${blockNumber}`)

   //Retrieves the deployed bytecode of a smart contract at a specific Ethereum address. Parameters include contractAddresss, blockTag
   const code = await provider.getCode(contractAddress)
   log(`Bytecode: ${code}`)

   //Retrieves the current gas fee estimates for transactions on the Ethereum network. Returns gas--Price, The maximum total fee per unit of gas(maxFeePerGas) and The priority fee (tip) per unit of gas(maxPriorityFeePerGas)
   const dataFeed = await provider.getFeeData()
   log(`Gas data feed: ${dataFeed.maxFeePerGas}`)


   //Allows you to fetch past events from the Ethereum blockchain by filtering logs. Logs are emitted by smart contracts when they execute events.
   const logs = await provider.getLogs({
        address: contractAddress,
        fromBlock: 4, // Start block
        toBlock: "latest"    // End block
   })
   log(logs)

   const network = await provider.getNetwork()
   log(network.name)

   //Retrieves the raw storage value at a given storage slot for a smart contract at a specific Ethereum address. Parameters include address, position and blockTag
   const storage = await provider.getStorage(contractAddress, slotIndex)
   log(`Amount of storage occupiied by the contract: ${storage}`)

   //Retrieves transaction details using its unique transaction hash.
   const txHash = '0xfa5ad2a7c20771706071e567db6c83137bfe8b3854eafb54c173d05b813343c6' //Transaction Hash
   const getTx = await provider.getTransaction(txHash)
   log(getTx)

   //Retrieves number of transaction(nonce) sent from a given Ethereum address. Parameter include the address and blockTag(latest(default), pending, earliest)
   const txCount = await provider.getTransactionCount(process.env.PUBLIC_KEY)
   log(`Transaction Counts: ${txCount}`)

   // Retrieves the receipt of a transaction, which includes details like gas usage, logs, and status (success or failure). Line 62 and 65 returns the same things
   const receipt = await provider.getTransactionReceipt(txHash);
   console.log(receipt);
   
   const receiptTx = await provider.waitForTransaction(txHash);
   // console.log("Transaction mined! Receipt:", receiptTx);

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