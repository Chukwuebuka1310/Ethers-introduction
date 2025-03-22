require('dotenv').config()
const { log } = require('console')
const {Wallet} = require('ethers')
const fs = require('fs')


async function main() {

   const wallet = new Wallet(process.env.PRIVATE_KEY)
   const encryptedJsonKey = await wallet.encrypt(process.env.PASSWORD)

   // log(encryptedJsonKey)
   fs.writeFileSync("./.encryptedKey.json", encryptedJsonKey);
}

main()