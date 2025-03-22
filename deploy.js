require('dotenv').config()
const { log } = require('console')
const {JsonRpcProvider, Wallet, ContractFactory} = require('ethers')
const fs = require('fs')

async function main() {

    const provider = new JsonRpcProvider(process.env.RPC_URL)
    const wallet = new Wallet(process.env.PRIVATE_KEY, provider)

    // const encryptedJsonKey = fs.readFileSync('./.encryptedKey.json', 'utf8')
    // let wallet = await Wallet.fromEncryptedJson(encryptedJsonKey, process.env.PASSWORD)
    // wallet = wallet.connect(provider)

    // const sender = await wallet.getAddress(); 
    // const nonce = await provider.getTransactionCount(sender, "latest");
    // console.log(`Current nonce: ${nonce}`);

    const abi = fs.readFileSync('SimpleStorage_sol_SimpleStorage.abi', 'utf8')
    const binary = fs.readFileSync('SimpleStorage_sol_SimpleStorage.bin', 'utf8')

    const contractFactory = new ContractFactory(abi, binary, wallet)
    const contract = await contractFactory.deploy()
    await contract.waitForDeployment()
    // log(contract.target)

    const favouriteNumber = await contract.retrieve()
    log(`Favourite number is: ${favouriteNumber}`)

    const txResponse = await contract.store(80)
    await txResponse.wait()

    const presentNumber = await contract.retrieve()
    log(`Favourite number is: ${presentNumber}`)

    const transactionResponse1 = await contract.addPerson('Jane', 44,)
    await transactionResponse1.wait()
    // // log(transactionReciept)

    const transactionResponse2 = await contract.addPerson('Raymond', 200,)
    await transactionResponse2.wait()

    const transactionResponse3 = await contract.addPerson('Naomi Raine', 62,)
    await transactionResponse3.wait()

    const nameToFavouriteNumber = await contract.nameToFavouriteNumber("Jane")
    console.log(`${nameToFavouriteNumber}`);

    const person1 = await contract.person(0); // Assuming Jane is the first entry
    console.log(`${person1.name} favourite number is ${person1.favouriteNumber}`);

    const person2 = await contract.person(1); // Assuming Jane is the first entry
    console.log(`${person2.name} favourite number is ${person2.favouriteNumber}`);

    const person3 = await contract.person(2); // Assuming Jane is the first entry
    console.log(`${person3.name} favourite number is ${person3.favouriteNumber}`);
}

main().catch((error) => {
        console.error("Error:", error);
    });

//This async function help us keep track of nonce while calling various function in the contract. The one above calls only one. This issues is only encountered while using the ganach blockchain but with the testnet, it will work just fine for the first main function above.


// async function main() {
//     const provider = new JsonRpcProvider(process.env.RPC_URL);
//     const wallet = new Wallet(process.env.PRIVATE_KEY, provider);

//     const abi = fs.readFileSync("SimpleStorage_sol_SimpleStorage.abi", "utf8");
//     const binary = fs.readFileSync("SimpleStorage_sol_SimpleStorage.bin", "utf8");

//     const contractFactory = new ContractFactory(abi, binary, wallet);
//     const contract = await contractFactory.deploy();
//     await contract.waitForDeployment();
//     console.log(`Contract deployed at: ${contract.target}`);

//     // Fetch the current nonce
//     let nonce = await provider.getTransactionCount(wallet.address, "latest");
//     console.log(`Starting nonce: ${nonce}`);

//     // Function to send transactions with correct nonce
//     async function sendTransaction(txFunction, ...args) {
//         const txResponse = await txFunction(...args, { nonce });
//         nonce++; // Increment nonce to avoid conflicts
//         const receipt = await txResponse.wait();
//         return receipt;
//     }

//     // Retrieve initial stored number
//     let favouriteNumber = await contract.retrieve();
//     console.log(`Favourite number is: ${favouriteNumber}`);

//     // Store a new favourite number with proper nonce handling
//     await sendTransaction(contract.store, 80);

//     // Retrieve updated stored number
//     let presentNumber = await contract.retrieve();
//     console.log(`Updated favourite number is: ${presentNumber}`);

//     // Add a person with the correct nonce
//     await sendTransaction(contract.addPerson, "Jane", 44);

//     // Retrieve the person’s favourite number
//     const nameToFavouriteNumber = await contract.nameToFavouriteNumber("Jane");
//     console.log(`Jane's favourite number is ${nameToFavouriteNumber}`);

//     // Retrieve Jane's details
//     const person = await contract.person(0);
//     console.log(`${person.name}'s favourite number is ${person.favouriteNumber}`);
// }

// // Run the script with proper error handling
// main().catch((error) => {
//     console.error("Error:", error);
// });

