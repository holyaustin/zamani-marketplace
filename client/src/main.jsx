import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import App from "./App";
import "./index.css";
import Explore from "./pages/explore";
import Create from "./pages/create";
import Nft from "./pages/nft";
import Global from "./pages/GlobalView";
import CollectionView from "./pages/CollectionView";
import NFTView from "./pages/NFTView";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/*" element={<App />} />
      <Route path="explore" element={<Explore />} />
      <Route path="create" element={<Create />} />
      <Route path="nft" element={<Nft />} />
      <Route path="/nft/:address/:id/:chainId" element={<NFTView />} />
      <Route path="/collection/:address/:id" element={<CollectionView />} />
      <Route path="/global" element={<Global />} />
      <Route path="/c" element={<CollectionView />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root"),
);
