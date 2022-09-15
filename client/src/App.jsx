
import { Navbar, Welcome, Footer, Sender } from "./components";

const App = () => (
  <div className="min-h-screen">
    <div className="bg-gradient-to-b from-red-700 to-black">
      <Navbar />
      <Welcome />
      <Sender />
    </div>
    <Footer />
  </div>
);

export default App;
