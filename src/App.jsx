import "./style.css";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { List } from "./components/List/List";

function App() {
  return (
    <main>
      <Header />
      <List />
      <Footer />
    </main>
  );
}

export default App;
