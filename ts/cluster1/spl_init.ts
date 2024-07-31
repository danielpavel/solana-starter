import { Keypair, Connection, Commitment } from "@solana/web3.js";
import { createMint } from "@solana/spl-token";
import wallet from "../wba-wallet.json";
import { getExplorerLink } from "@solana-developers/helpers";

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

(async () => {
  try {
    // Start here
    const mint = await createMint(
      connection,
      keypair,
      keypair.publicKey,
      null,
      9,
    );

    console.log(`✅ Mint created: ${mint.toBase58()}`);

    const link = getExplorerLink("address", mint.toBase58(), "devnet");
    console.log(`🌐 Explorer: ${link}`);
  } catch (error) {
    console.log(`Oops, something went wrong: ${error}`);
  }
})();
