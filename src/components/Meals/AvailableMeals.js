import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import useHttp from "../../hooks/use-http";
import classes from "./AvailableMeals.module.css";
import { Fragment, useEffect, useState } from "react";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const { httpRequest: fetchMealsData, isLoading, error } = useHttp();

  useEffect(() => {
    const requestConfig = {
      url: "https://react-http-d9ed7-default-rtdb.europe-west1.firebasedatabase.app/meals.json",
    };

    const transformData = (fetchedObj) => {
      const meals = [];

      for (const key in fetchedObj) {
        meals.push({
          id: key,
          name: fetchedObj[key].name,
          description: fetchedObj[key].description,
          price: fetchedObj[key].price,
        });
      }

      setMeals(meals);
    };

    fetchMealsData(requestConfig, transformData);
  }, [fetchMealsData]);

  if (isLoading)
    return (
      <Fragment>
        <p className={classes.loading}>Loading...</p>
      </Fragment>
    );
  if (error)
    return (
      <Fragment>
        <p className={classes.error}>{error}</p>
      </Fragment>
    );

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        {" "}
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
