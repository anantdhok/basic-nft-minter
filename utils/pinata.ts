import axios from "axios";

export const pinJSONToIPFS = async (body: any) => {
  const gateway = "https://gateway.pinata.cloud/ipfs/";
  const url = "https://api.pinata.cloud/pinning/pinJSONToIPFS";
  const headers = {
    headers: {
      pinata_api_key: process.env.NEXT_PUBLIC_PINATA_KEY,
      pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET
    }
  };

  return axios
    .post(url, body, headers)
    .then(res => {
      return { status: true, url: gateway + res.data.IpfsHash, message: "" };
    })
    .catch(err => {
      return { status: false, url: "", message: err.message };
    });
};
