import { useContext } from "react";
import { CartContext } from "./contexts";

const Header = () => {
  const [cart] = useContext(CartContext);
  return (
    <nav>
      <div className="logo">Padre Gino's Pizza</div>
      <div className="nav-cart">
        🛒<span className="nav-cart-number">{cart.length}</span>
      </div>
    </nav>
  );
};

export default Header;
