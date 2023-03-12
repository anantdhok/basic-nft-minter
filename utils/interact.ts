import { ethers } from "ethers";

import contractInfo from "@/contracts/index.json";

import { pinJSONToIPFS } from "./pinata";

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressList = await window.ethereum.request({ method: "eth_requestAccounts" });
      return { address: addressList[0], message: "" };
    } catch (error: any) {
      return { address: "", message: error.message + " 😥" };
    }
  } else {
    return { address: "", message: "You must install a Ethereum wallet in your browser. 📥" };
  }
};

export const getConnectedWallet = async () => {
  if (window.ethereum) {
    try {
      const addressList = await window.ethereum.request({ method: "eth_accounts" });
      return addressList.length > 0
        ? { address: addressList[0], message: "" }
        : { address: "", message: "Connect to wallet using the top right button. 👆" };
    } catch (error: any) {
      return { address: "", message: error.message + " 😥" };
    }
  } else {
    return { address: "", message: "You must install a Ethereum wallet in your browser. 📥" };
  }
};

export const mintNFT = async (name: string, description: string, image: string) => {
  // Validate all fields
  if (name.trim() == "" || description.trim() == "" || image.trim() == "")
    return { status: false, message: "Please fill all fields before minting. ✍️" };

  // Generate metadata and save to IPFS
  const metadata = { name, description, image };
  const stored = await pinJSONToIPFS(metadata);
  if (!stored.status) return { status: false, message: "Couldn't upload your data on IPFS. 😢" };

  try {
    // Get provider from injected-wallet in browser
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);

    // Interact with smart contract
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractInfo.address, contractInfo.interface, signer);

    // Call safeMint method of contract with recipient and tokenURI
    const txn = await contract.safeMint(window.ethereum.selectedAddress, stored.url);
    const receipt = await txn.wait();

    const explorer = "https://mumbai.polygonscan.com/tx/";
    return { status: true, message: "Check your transaction at: " + `${explorer}${receipt.hash} ✌️` };
  } catch (error: any) {
    return { status: false, message: "Something went wrong 😥, " + error.message };
  }
};
