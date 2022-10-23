import "./App.css";
import { Routes, Route } from "react-router-dom";
import * as Vibrant from "node-vibrant";
import React, { useEffect, useState } from "react";
import Global from "../pages/GlobalView";
import CollectionView from "../pages/CollectionView";
import NFTView from "../pages/NFTView";
import Logo from "../assets/logo.svg";
import img from "../assets/banner.png";
import { CONFIG } from "../config";
// import { Covalent } from ".";

function Covalent() {
  useEffect(() => {
    if (CONFIG.TEMPLATE.banner_picture !== "") {
      getColor();
    }
  }, []);

  const [bg, setBg] = useState("");
  const [vibrant, setVibrant] = useState("");
  const [light, setLight] = useState("");
  const [dark, setDark] = useState("");

  const getColor = async () => {
    const palette = await Vibrant.from(CONFIG.TEMPLATE.banner_picture).getPalette();
    console.log(palette);
    setBg(palette.DarkMuted.getHex());
    setLight(palette.LightVibrant.getHex());
    setVibrant(palette.Vibrant.getHex());
    setDark(palette.DarkVibrant.getHex());
    return palette;
  };

  return (
    <div className="App" style={{ backgroundColor: `${bg}` }}>
      <Routes>
        <Route path="/nft/:address/:id/:chainId" element={<NFTView />} />
        <Route path="/collection/:address/:id" element={<CollectionView />} />
        <Route path="/global" element={<Global />} />
        <Route path="/c" element={<CollectionView />} />
      </Routes>

      <div className="logo">
        <img src={Logo} />
      </div>
    </div>
  );
}

export default Covalent;
