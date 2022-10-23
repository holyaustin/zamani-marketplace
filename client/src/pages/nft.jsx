import { Navbar, Footer, Covalent } from "../components";

const explore = () => (
  <div className="bg-gradient-to-b from-purple-700 to-black">
    <Navbar />
    <div className="text-4xl text-center text-white font-bold mt-10 mb-20">
      <h1> NFT Collectibles powered by Covalent </h1>
    </div>
    <Covalent />
    <Footer />
  </div>
);

export default explore;
