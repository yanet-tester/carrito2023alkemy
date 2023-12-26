import "./App.css";
import Home from "./Components/Home";
import { CartProvider } from "./Context/CartContext";

function App() {
  return (
    <CartProvider>
      <Home />
     
    </CartProvider>
  );
}

export default App;
