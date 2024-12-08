import { useState, useEffect, useContext } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import Pizza from "../Pizza";
import Cart from "../Cart";
import { CartContext } from "../contexts";

export const Route = createLazyFileRoute("/order")({
  component: Order,
});

const intl = new Intl.NumberFormat("en-SG", {
  style: "currency",
  currency: "SGD",
});

function Order() {
  const [pizzaTypes, setPizzaTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPizza, setSelectedPizza] = useState(null);
  const [pizzaSize, setPizzaSize] = useState("M");
  const [cart, setCart] = useContext(CartContext);

  async function checkout() {
    setLoading(true);
    await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart }),
    });

    setCart([]);
    setLoading(false);
  }

  const fetchPizzaTypes = async () => {
    const pizzaRes = await fetch("/api/pizzas");
    const pizzaJson = await pizzaRes.json();
    setPizzaTypes(pizzaJson);
    setLoading(false);
  };

  useEffect(() => {
    fetchPizzaTypes();
  }, []);

  const getPizzaById = (id) => {
    return pizzaTypes.find((pizza) => pizza.id === id);
  };

  const getSizeOptions = (sizes) => {
    return Object.entries(sizes).map(([size, price]) => ({
      value: size,
      label: `${size}(${intl.format(price)})`,
    }));
  };

  return (
    <div className="order-page">
      <div className="order">
        <h2>Create Order</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setCart([...cart, { pizza: selectedPizza, size: pizzaSize }]);
          }}
        >
          <div>
            <div>
              <label htmlFor="pizza-type">Pizza Type</label>
              {loading ? (
                <h1>Loading Pizzas...</h1>
              ) : (
                <select
                  name="pizza-type"
                  value={selectedPizza?.id || ""}
                  onChange={(e) =>
                    setSelectedPizza(getPizzaById(e.target.value))
                  }
                >
                  <option value="">Select a pizza</option>
                  {pizzaTypes.map((pizza) => (
                    <option key={pizza.id} value={pizza.id}>
                      {pizza.name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {selectedPizza && (
              <div>
                <label htmlFor="pizza-size">Pizza Size</label>
                {getSizeOptions(selectedPizza.sizes).map(({ value, label }) => (
                  <span key={`pizza-${value.toLowerCase()}`}>
                    <input
                      checked={pizzaSize === value}
                      type="radio"
                      name="pizza-size"
                      value={value}
                      id={`pizza-${value.toLowerCase()}`}
                      onChange={(e) => setPizzaSize(e.target.value)}
                    />
                    <label htmlFor={`pizza-${value.toLowerCase()}`}>
                      {label}
                    </label>
                  </span>
                ))}
              </div>
            )}

            <button type="submit" disabled={!selectedPizza}>
              Add to Cart
            </button>
          </div>

          <div className="order-pizza">
            {selectedPizza && (
              <Pizza
                key={selectedPizza.id}
                name={selectedPizza.name}
                description={selectedPizza.description}
                image={selectedPizza.image}
                price={
                  selectedPizza.sizes[pizzaSize]
                    ? intl.format(selectedPizza.sizes[pizzaSize])
                    : "Price not available"
                }
              />
            )}
          </div>
        </form>
      </div>
      {loading ? <h2>Loading...</h2> : <Cart cart={cart} checkout={checkout} />}
    </div>
  );
}
