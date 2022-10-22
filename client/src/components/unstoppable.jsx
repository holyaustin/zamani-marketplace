/* eslint-disable max-len */
import React, { useEffect, useState } from "react";
import Blockies from "react-blockies";
import UAuth from "@uauth/js";

const truncateAddress = (address) => `${address.slice(0, 8)}...${address.slice(-4)}`;

const uauth = new UAuth({
  clientID: "0e876f9b-988d-40e2-996a-9d941b76994a",
  redirectUri: "https://nftafrica-glochain.vercel.app",
  scope: "openid wallet"
});

const ConnectWallet = () => {
  const [haveMetamask, sethaveMetamask] = useState(true);
  const [address, setAddress] = useState();

  useEffect(() => {
    const { ethereum } = window;
    const checkMetamaskAvailability = async () => {
      if (!ethereum) {
        sethaveMetamask(false);
      }
      sethaveMetamask(true);
    };
    checkMetamaskAvailability();
  }, []);
  /**
  const connectWallet = async () => {
    if (!address) {
      const { ethereum } = window;
      try {
        if (!ethereum) {
          sethaveMetamask(false);
        }
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        setAddress(accounts[0]);
      } catch (error) {
        console.error(error);
      }
    }
  };
 */
  const ConnectUnstoppable = async () => {
    try {
      const authorization = await uauth.loginWithPopup();

      if (authorization.idToken.wallet_address) {
        setAddress(authorization.idToken.wallet_address);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    uauth
      .logout()
      .then(() => {
        setAddress(null);
      })
      .catch((error) => {
        console.error("profile error:", error);
      });
  };

  return (
    <div className="bg-white-100 ">
      {address && (
        <Blockies
          className="rounded-full"
          seed={address.toLowerCase()}
          size={1}
          scale={1}
        />
      )}
      {address ? (
        <>
          <div className="mt-10 space-x-1 text-2xl sm:text-4xl sm:space-x-3 font-bold tracking-wide py-7 px-10 sm:px-14 border border-orange-500 text-orange-500 bg-white outline-none rounded-l-full rounded-r-full capitalize hover:bg-orange-500 hover:text-red-500 transition-all hover:shadow-orange">

            {truncateAddress(address)}

          </div>
          <div className="mt-10 space-x-1 text-2xl sm:text-4xl sm:space-x-3 font-bold tracking-wide py-7 px-10 sm:px-14 border border-orange-500 text-orange-500 bg-white outline-none rounded-l-full rounded-r-full capitalize hover:bg-orange-500 hover:text-red-500 transition-all hover:shadow-orange ">
            <button
              className="font-2xl tracking-wide py-2 px-5 sm:px-8 border border-orange-500 text-orange-500 bg-white-500 outline-none rounded-l-full rounded-r-full capitalize hover:bg-orange-500 hover:text-white-500 transition-all hover:shadow-orange"
              onClick={logout}
              type="button"
            >
              Logout
            </button>
          </div>
        </>

      ) : (

        <div className="mt-10 space-x-1 text-2xl sm:text-4xl sm:space-x-3 font-bold tracking-wide py-7 px-10 sm:px-14 border border-orange-500 text-orange-500 bg-white outline-none rounded-l-full rounded-r-full capitalize hover:bg-orange-500 hover:text-red-500 transition-all hover:shadow-orange ">
          <button
            type="button"
            className=""
            onClick={ConnectUnstoppable}
          >
            Login with Unstoppable
          </button>

        </div>
      )}
    </div>
  );
};

export default ConnectWallet;
