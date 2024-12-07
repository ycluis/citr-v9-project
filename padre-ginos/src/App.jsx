import { createRoot } from "react-dom/client";
import Pizza from "./Pizza";

const pizzaMenu = [
  {
    id: 1,
    name: "Pepperoni",
    description: "A classic pizza with pepperoni and cheese",
  },
  {
    id: 2,
    name: "Margherita",
    description: "A classic pizza with tomato sauce, mozzarella, and basil",
  },
  {
    id: 3,
    name: "Hawaiian",
    description: "A classic pizza with ham, pineapple, and cheese",
  },
];

const App = () => {
  return (
    <div>
      <h1>Padre Gino's - Order Now</h1>
      {pizzaMenu.map((pizza) => (
        <Pizza key={pizza.id} {...pizza} />
      ))}
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
