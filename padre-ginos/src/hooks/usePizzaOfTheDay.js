import { useState, useEffect } from "react";

export const usePizzaOfTheDay = () => {
  const [pizzaOfTheDay, setPizzaOfTheDay] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPizzaOfTheDay = async () => {
      const pizzaRes = await fetch("/api/pizza-of-the-day");
      const pizzaJson = await pizzaRes.json();
      setPizzaOfTheDay(pizzaJson);
      setLoading(false);
    };

    fetchPizzaOfTheDay();
  }, []);

  return loading ? null : pizzaOfTheDay;
};
