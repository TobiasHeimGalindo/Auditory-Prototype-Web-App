import React, { useState } from "react";
import { Button, Grid } from "@mui/material";
import CardComponent from "./shared/CardComponent";
import styles from "./MenuSelection.module.scss";

const MenuSelection = () => {
  const [selectedCategory, setSelectedCategory] = useState("Ramen");

  const categories = [
    { id: "Ramen", label: "Ramen" },
    { id: "Rice", label: "Rice" },
    { id: "Drinks", label: "Drinks" },
    { id: "Dessert", label: "Dessert" },
  ];

  const dishes = [
    {
      id: 1,
      category: "Ramen",
      title: "Spicy Miso Ramen",
      ingredients: "Pork, egg, noodles, miso, chili oil",
      price: "$12.99",
    },
    {
      id: 2,
      category: "Ramen",
      title: "Tonkotsu Ramen",
      ingredients: "Pork, egg, noodles, pork bone broth",
      price: "$13.99",
    },
    {
      id: 3,
      category: "Ramen",
      title: "Vegetarian Ramen",
      ingredients: "Tofu, mushrooms, noodles, miso broth",
      price: "$11.99",
    },
    {
      id: 4,
      category: "Ramen",
      title: "Shoyu Ramen",
      ingredients: "Chicken, noodles, soy sauce broth",
      price: "$12.99",
    },
    {
      id: 5,
      category: "Rice",
      title: "Beef Bulgogi Rice Bowl",
      ingredients: "Beef, rice, bulgogi sauce, carrots, spinach",
      price: "$10.99",
    },
    {
      id: 6,
      category: "Rice",
      title: "Shrimp Fried Rice",
      ingredients: "Shrimp, rice, eggs, peas, carrots",
      price: "$9.99",
    },
    {
      id: 7,
      category: "Rice",
      title: "Vegetable Curry Rice",
      ingredients: "Mixed vegetables, curry sauce, rice",
      price: "$8.99",
    },
    {
      id: 8,
      category: "Drinks",
      title: "Iced Matcha Latte",
      ingredients: "Matcha powder, milk, ice",
      price: "$4.99",
    },
    {
      id: 9,
      category: "Drinks",
      title: "Thai Iced Tea",
      ingredients: "Thai tea, condensed milk, ice",
      price: "$3.99",
    },
    {
      id: 10,
      category: "Drinks",
      title: "Lemonade",
      ingredients: "Lemon juice, water, sugar",
      price: "$2.99",
    },
    {
      id: 11,
      category: "Dessert",
      title: "Matcha Mochi Ice Cream",
      ingredients: "Mochi, matcha ice cream",
      price: "$4.99",
    },
    {
      id: 12,
      category: "Dessert",
      title: "Black Sesame Pudding",
      ingredients: "Black sesame paste, milk, sugar",
      price: "$3.99",
    },
    {
      id: 13,
      category: "Dessert",
      title: "Matcha Cheesecake",
      ingredients: "Cream cheese, matcha powder, sugar",
      price: "$5.99",
    },
  ];

  const filteredDishes = dishes.filter(
    (dish) => dish.category === selectedCategory
  );

  return (
    <div>
      <div className={styles.menuSelection}>
        {categories.map((category) => (
          <Button
            key={category.id}
            variant="contained"
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.label}
          </Button>
        ))}
      </div>

      <Grid container spacing={2}>
        {filteredDishes.map((dish) => (
          <Grid item key={dish.id} xs={12} sm={6} md={4}>
            <CardComponent
              cardClass={styles.menuCard}
              title={dish.title}
              ingredients={dish.ingredients}
              price={dish.price}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MenuSelection;
