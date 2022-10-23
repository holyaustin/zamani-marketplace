
import { Navbar, Welcome, Footer, Sender, Covalent } from "./components";
// import { CollectionView } from "./pages";
// import CollectionView from "./pages/CollectionView";

const App = () => (
  <div className="min-h-screen">
    <div className="bg-gradient-to-b from-purple-900 to-pink-500">
      <Navbar />
      <Welcome />
      <Covalent />
      {/** <CollectionView /> */}
      <Sender />
    </div>
    <Footer />
  </div>
);

export default App;
