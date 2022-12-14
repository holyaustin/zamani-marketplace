import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon, IconSize, } from "@blueprintjs/core";
import axios from "axios";
import axiosRetry from "axios-retry";
import SelectDropdown from "../../comps/selectDropdown";
import Table from "../../comps/table";
import Banner from "../../comps/banner";
import Back from "../../assets/Back.svg";
import { CONFIG } from "../../config";
import Loader from "../../assets/covalent-logo-loop_dark_v2.gif";
import "./style.css";

export default function LandingPage({ light, dark, vibrant }) {
  const navigate = useNavigate();
  const [chain, setChain] = useState(CONFIG.TEMPLATE.block_chain_id);
  const [market, setMarket] = useState([]);
  const [activeLoader, setLoader] = useState(true);
  const API_KEY = process.env.REACT_APP_COVALENT_API;

  axiosRetry(axios, {
    retries: 3,
    retryDelay: (retryCount) => {
      console.log(`retry attempt: ${retryCount}`);
      return retryCount * 2000;
    },
    retryCondition: (error) => error.response.status === 503,
  });

  useEffect(() => {
    handleMarket(chain);
  }, [chain]);

  // Request for market (global view)
  const handleMarket = async (id) => {
    setLoader(true);
    try {
      const resp = await axios.get(`https://api.covalenthq.com/v1/${id}/nft_market/`, { auth: { username: CONFIG.TEMPLATE.api_key } });
      console.log(resp.data.data.items);
      setMarket(resp.data.data.items);
      setLoader(false);
    } catch (error) {

    }
  };

  return (
    <>
      <Banner
        img={CONFIG.TEMPLATE.banner_picture !== "" ? CONFIG.TEMPLATE.banner_picture : null}
        head={CONFIG.TEMPLATE.title}
        subhead="Code Template"
        color={vibrant}
      />
      <div className="main">
        <div className="back" style={{ color: light || "#FF4C8B" }} onClick={() => { navigate.goBack(); }}>
          <Icon icon="chevron-left" size={24} intent="primary" color={light || "#FF4C8B"} className="icon" />
          Back
        </div>
        <div className="content">
          <div className="select-chain">
            <SelectDropdown
              options={CONFIG.FILTER_OPTIONS}
              onChange={(e) => { setChain(e.target.value); }}
              id={CONFIG.TEMPLATE.block_chain_id}
            />
          </div>
          {activeLoader ? (
            <div className="load">
              <img src={Loader} />
            </div>
          )
            : (
              <Table
                onClick={(id) => {
                  if (id !== CONFIG.TEMPLATE.collection_address) {
                    navigate(`/collection/${id}/${chain}`);
                  } else {
                    navigate.goBack();
                  }
                }}
                data={market}
                load={activeLoader}
                color={vibrant}
              />
            )}
        </div>
      </div>
    </>
  );
}
