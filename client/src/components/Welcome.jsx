import React, { useState } from "react";
import coinbaseWalletModule from "@web3-onboard/coinbase";
import walletConnectModule from "@web3-onboard/walletconnect";
import injectedModule from "@web3-onboard/injected-wallets";
import Onboard from "@web3-onboard/core";
import ConnectUnstoppable from "./unstoppable";
import logo1 from "../assets/banner2.jpg";

const coinbaseWalletSdk = coinbaseWalletModule();
const walletConnect = walletConnectModule();
const injected = injectedModule();

const modules = [coinbaseWalletSdk, walletConnect, injected];

const MAINNET_RPC_URL = "https://polygon-mainnet.g.alchemy.com/v2/odpZQIbE3xtAii8qMNePX-0M6fyB8G0V";
const MUMBAI_RPC_URL = "https://polygon-mumbai.g.alchemy.com/v2/odpZQIbE3xtAii8qMNePX-0M6fyB8G0V";
const RINKEBY_RPC_URL = "https://eth-rinkeby.alchemyapi.io/v2/odpZQIbE3xtAii8qMNePX-0M6fyB8G0V";

const onboard = Onboard({
  wallets: modules, // created in previous step
  chains: [
    {
      id: "0x137", // chain ID must be in hexadecimel
      token: "MATIC",
      namespace: "evm",
      label: "Polygon Mainnet",
      rpcUrl: MAINNET_RPC_URL
    },
    {
      id: "0x80001",
      token: "Matic",
      namespace: "evm",
      label: "Mumbai Testnet",
      rpcUrl: MUMBAI_RPC_URL
    },
    {
      id: "0x4",
      token: "rETH",
      namespace: "evm",
      label: "Ethereum Rinkeby Testnet",
      rpcUrl: RINKEBY_RPC_URL
    }
  ],
  appMetadata: {
    name: "Recyclant",
    icon: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    description: "Recycle waste and save our enviroment",
    recommendedInjectedWallets: [
      { name: "Coinbase", url: "https://wallet.coinbase.com/" },
      { name: "MetaMask", url: "https://metamask.io" }
    ]
  }
});

const Welcome = () => {
  // const { currentAccount } = useContext(TransactionContext);
  const [account, setAccount] = useState();

  const connectWallet2 = async () => {
    try {
      const wallets = await onboard.connectWallet();
      const { accounts, } = wallets[0];
      setAccount(accounts[0].address);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex w-full mf:flex-row flex-col justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 px-4">
        <div className="flex flex-1 justify-start items-start flex-col mf:mr-10 ">
          <h1 className="text-5xl sm:text-7xl text-white py-1 font-semibold">
            NFTAfrica MarketPlace <br />
          </h1><br />
          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-4xl ">
            create digital arts <br /> mint them as NFT <br /> Sell and make profit
          </p><br />
          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-2xl">
            The world's first and largest digital marketplace <br />for crypto collectibles and non-fungible tokens<br /> (NFTs). Buy, sell, and discover exclusive digital items. <br />
          </p><br />
          <ConnectUnstoppable />
          {/** {!currentAccount && ( )}
          <button
            type="button"
            onClick={connectWallet2}
            className="flex flex-row justify-center items-center my-5 bg-red-300 p-3 rounded-full cursor-pointer hover:bg-red-800 hover:text-white"
          >

            <p className="text-black text-3xl font-semibold py-3 px-10 mx-14 hover:text-white">
              Connect Wallet
            </p>
          </button>
          <div className="text-white text-2xl font-semibold mx-4 my-5 ">
            <div>Connected Wallet Address: <br /> {account}</div>
          </div>
                  */}
        </div>
      </div>
      <div className="sm:flex-[0.9] lg:flex-[0.9]flex-initial justify-left items-center">

        <img src={logo1} alt="welcome" className="w-100 cursor-pointer" />
      </div>
    </div>
  );
};

export default Welcome;
