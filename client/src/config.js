export const CONFIG = {
  TEMPLATE: {
    // 1. Set your NFT collection contract address
    collection_address: "0xe19b9D6538c1AB71434098D9806A7cEc5B186bA0",

    // 2. Set your blockchain chain ID where your NFT collection contract address is deployed (see below for value options)
    block_chain_id: "1",

    // 3. Set the default title of your dashboard. If found, this template uses the NFT Collection name for the title.
    title: "Trending NFT Collection",

    // 4. Set your Covalent API Key
    api_key: "ckey_bc2583724256489bb3cc29765b9",

    // 5. (Optional) Display the floor price chart
    timeseries_chart: true,

    // 6. (Optional) Set your banner image
    banner_picture: "",
  },

  // Supported networks - just for your reference
  FILTER_OPTIONS: [
    { name: "Ethereum", value: 1 },
    { name: "Polygon", value: 137 },
    { name: "Avalanche", value: 43114 },
    { name: "Fantom", value: 250 },
    { name: "Moonbeam", value: 1284 },
    { name: "Moonriver", value: 1285 },
    { name: "Arbitrum", value: 42161 },
    { name: "Shiden", value: 336 }
  ],
  // Supported timeframes - just for your reference
  GRAPH_OPTIONS: [
    { name: "7 Days", value: 7 },
    { name: "1 Month", value: 30 },
    { name: "3 Month", value: 90 },
    { name: "1 Year", value: 365 },
    { name: "All time", value: 0 },
  ],
};
