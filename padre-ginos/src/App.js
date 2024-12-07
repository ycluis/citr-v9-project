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

const Pizza = ({ name, description }) => {
  return React.createElement("div", {}, [
    React.createElement("h1", { key: "title" }, name),
    React.createElement("p", { key: "description" }, description),
  ]);
};

const App = () => {
  return React.createElement("div", {}, [
    React.createElement(
      "h1",
      { key: "header", className: "text-3xl font-bold underline" },
      "Padre Gino's"
    ),
    pizzaMenu.map((pizza) =>
      React.createElement(Pizza, { key: pizza.id, ...pizza })
    ),
  ]);
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));
