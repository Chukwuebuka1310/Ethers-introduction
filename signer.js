const ethers = require('ethers')
require('dotenv').config()

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)
//Instead of signer, wallet was used cause the below returns an object with wallet as its name
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)




async function main() {

   const tx = {
      to: "0xA6138D1d91473C9775e4066fd64c1dF11c5B701A", // Receiver's address
      value: ethers.parseEther("0.005"), // Sending 0.005 ETH,
      gasLimit: 21000,  // Minimum gas for a simple ETH transfer
      maxPriorityFeePerGas: ethers.parseUnits("2", "gwei"),
      maxFeePerGas: ethers.parseUnits("20", "gwei"),
      nonce: await wallet.getNonce(),
      chainId: 11155111
   };

   //Retrieves the address of the sender 
   const address = await wallet.getAddress()
   console.log(`Address: ${address}`);

   //Retrieve the nounce of transaction of the blockchain. This method is specific on the signer unlike provider.blockNumber() that is for the global blockchain
   const nounce = await wallet.getNonce()
   console.log(`Nounce: ${nounce}`);

   //Retrieve the estimated gas price for a transaction to occur
   const gasEstimate = await wallet.estimateGas(tx)
   console.log(`Gas Estimate: ${gasEstimate}`);
   
   //populate a transaction request with all necessary fields before making a read-only call to a contract or address. returns an obj with to, value, from
   const populateCall = await wallet.populateCall(tx)
   console.log(populateCall)
   
   //Fills in missing details of a transaction request before signing or sending it. returns an obj with to, value, from
   const populateTx = await wallet.populateTransaction(tx)
   console.log(populateTx)

   const ENSaddress = await wallet.resolveName("vitalik.eth");
    console.log("Resolved Address:", ENSaddress);

   const sendTx = await wallet.sendTransaction(tx)
   console.log('Sent Transaction', sendTx)

   //This is used to digitally sign a message using the signer's private key. This is useful for authentication, off-chain signatures, and verifying identity without sending a blockchain transaction.
   const message = "Hello, Ethereum!";
   const message1 = "Hello, Polygon!";
   const signedMessage = await wallet.signMessage(message);
   console.log("Signed Message:", signedMessage);

   const recoveredAddress = ethers.verifyMessage(message, signedMessage);
   console.log("Recovered Address:", recoveredAddress);

   //Verifies the signed message
   console.log(await wallet.getAddress() == recoveredAddress ? true : false)

   const signedTx = await wallet.signTransaction(tx)
   console.log('Signed Transaction', signedTx)

   const broadCastTx = await provider.broadcastTransaction(signedTx)
   console.log('Broadcast Transaction Transaction', broadCastTx);
   

}

main()