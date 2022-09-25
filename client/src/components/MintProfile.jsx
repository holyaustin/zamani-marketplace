/* eslint-disable consistent-return */
/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
import React, { useState } from "react";
import { NFTStorage } from "nft.storage";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import axios from "axios";
import Web3Modal from "web3modal";
import Waste from "../utils/NFTAfrica.json";
import { nftmarketplaceAddress } from "../../config";

// eslint-disable-next-line max-len
const APIKEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGVFNjg2MjliODhCNzg1NTdFODgxNzQxMGE5RkQzZTlFOWE4MjVFODAiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2MzI1NzUwNjE5OCwibmFtZSI6Ik5GVEFmcmljYSJ9.RDomOPpapkAjHXNizveAVhyzuu2nvRkaXSb5NznxplY";

/** rewrite ipfs:// uri to dweb.link gateway URLs
function makeGatewayURL(ipfsURI) {
  return ipfsURI.replace(/^ipfs:\/\//, "https://dweb.link/ipfs/");
}
 */

const MintWaste = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [uploadedFile, setUploadedFile] = useState();
  const [imageView, setImageView] = useState();
  const [metaDataURL, setMetaDataURl] = useState();
  const [txURL, setTxURL] = useState();
  const [txStatus, setTxStatus] = useState();
  const [formInput, updateFormInput] = useState({ name: "", description: "", price: "" });

  const handleFileUpload = (event) => {
    console.log("file for upload selected...");
    setUploadedFile(event.target.files[0]);
    setTxStatus("");
    setImageView("");
    setMetaDataURl("");
    setTxURL("");
  };

  const uploadNFTContent = async (inputFile) => {
    const { name, description, price } = formInput;
    if (!name || !description || !price || !inputFile) return;
    const nftStorage = new NFTStorage({ token: APIKEY, });
    try {
      console.log("Trying to upload asset to ipfs");
      setTxStatus("Uploading Item to IPFS & Filecoin via NFT.storage.");
      const metaData = await nftStorage.store({
        name,
        description,
        image: inputFile,
      });
      setMetaDataURl(metaData.url);
      console.log("metadata is: ", { metaData });
      return metaData;
    } catch (error) {
      setErrorMessage("Could not save Waste to NFT.Storage - Aborted minting Waste.");
      console.log("Error Uploading Content", error);
    }
  };

  const sendTxToBlockchain = async (metadata) => {
    try {
      setTxStatus("Adding transaction to Polygon Mumbai Blockchain.");
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);

      const price = ethers.utils.parseUnits(formInput.price, "ether");
      const connectedContract = new ethers.Contract(nftmarketplaceAddress, Waste.abi, provider.getSigner());
      console.log("Connected to contract", nftmarketplaceAddress);
      console.log("IPFS blockchain uri is ", metadata.url);

      const mintNFTTx = await connectedContract.createToken(metadata.url, price);
      console.log("NFT successfully created and sent to Blockchain");
      // await mintNFTTx.wait();
      return mintNFTTx;
    } catch (error) {
      setErrorMessage("Failed to send tx to Polygon Mumbai.");
      console.log(error);
    }
  };

  const previewNFT = (metaData, mintNFTTx) => {
    console.log("getIPFSGatewayURL2 two is ...");
    const imgViewString = getIPFSGatewayURL(metaData.data.image.pathname);
    console.log("image ipfs path is", imgViewString);
    setImageView(imgViewString);
    setMetaDataURl(getIPFSGatewayURL(metaData.url));
    setTxURL(`https://mumbai.polygonscan.com/tx/${mintNFTTx.hash}`);
    setTxStatus("Waste registration was successfully!");
    console.log("Preview details completed");
  };

  const mintNFTToken = async (e, uploadedFile) => {
    e.preventDefault();
    // 1. upload NFT content via NFT.storage
    const metaData = await uploadNFTContent(uploadedFile);

    // 2. Mint a NFT token on Polygon
    const mintNFTTx = await sendTxToBlockchain(metaData);

    // 3. preview the minted nft
    previewNFT(metaData, mintNFTTx);
    mintReward();

    navigate("/explore");
  };

  // NFTPort Reward NFT code here
  async function mintReward() {
    const { ethereum } = window;
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });

    console.log("Connected", accounts[0]);
    // const playerAccount = deploy;

    const options = {
      method: "POST",
      url: "https://api.nftport.xyz/v0/mints/easy/urls",
      headers: { "Content-Type": "application/json", Authorization: "67e28edf-3870-4645-a1f1-1c68798b7fcf" },
      data: {
        chain: "polygon",
        name: "AutoRecover",
        description: "Reward for creating bounty",
        // using IPFS to pin reward NFT
        file_url: "https://bafkreievjsq4glmoz4lzvwob6yfsaifpbufsnj47oz47ml4oa6dh4enhbi.ipfs.nftstorage.link/",
        mint_to_address: accounts[0],
      },
    };

    axios.request(options).then((response) => {
      console.log(response.data);
    }).catch((error) => {
      console.error(error);
    });
  }

  const getIPFSGatewayURL = (ipfsURL) => {
    const urlArray = ipfsURL.split("/");
    // console.log("urlArray = ", urlArray);
    const ipfsGateWayURL = `https://${urlArray[2]}.ipfs.nftstorage.link/${urlArray[3]}`;
    // console.log("ipfsGateWayURL = ", ipfsGateWayURL)
    return ipfsGateWayURL;
  };

  return (
    <>
      <div className="text-4xl text-center text-white font-bold mt-10">
        <h1> Mint Digital Art</h1>
      </div>
      <div className="flex justify-center">
        <div className="w-1/2 flex flex-col pb-12 ">
          <input
            placeholder="Enter Asset Name"
            className="mt-5 border rounded p-4 text-xl"
            onChange={(e) => updateFormInput({ ...formInput, name: e.target.value })}
          />
          <textarea
            placeholder="Description of Asset"
            className="mt-5 border rounded p-4 text-xl"
            onChange={(e) => updateFormInput({ ...formInput, description: e.target.value })}
            rows={2}
          />
          <input
            placeholder="Price in Matic, if free put 0"
            className="mt-5 border rounded p-4 text-xl"
            onChange={(e) => updateFormInput({ ...formInput, price: e.target.value })}
          />
          <br />

          <div className="MintNFT text-white text-xl">
            <form>
              <h3>Select a picture of the Art</h3>
              <input type="file" onChange={handleFileUpload} className="mt-5 border rounded p-4 text-xl" />
            </form>
            {txStatus && <p>{txStatus}</p>}
            <br />
            {metaDataURL && <p className="text-blue"><a href={metaDataURL} className="text-blue">Metadata on IPFS</a></p>}
            <br />
            {txURL && <p><a href={txURL} className="text-blue">See the mint transaction</a></p>}
            <br />
            {errorMessage}

            <br />
            {imageView && (
            <img
              className="mb-10"
              title="Ebook "
              src={imageView}
              alt="NFT preview"
              frameBorder="0"
              scrolling="auto"
              height="50%"
              width="100%"
            />
            )}

          </div>

          <button type="button" onClick={(e) => mintNFTToken(e, uploadedFile)} className="font-bold mt-20 bg-red-500 text-white text-2xl rounded p-4 shadow-lg">
            Mint Asset
          </button>
        </div>
      </div>
    </>

  );
};
export default MintWaste;
