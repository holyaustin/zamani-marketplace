
import { Navbar, Welcome, Footer, Sender } from "./components";

const App = () => (
  <div className="min-h-screen">
    <div className="bg-gradient-to-b from-purple-900 to-pink-500">
      <Navbar />
      <Welcome />
      <Sender />
    </div>
    <Footer />
  </div>
);

export default App;
