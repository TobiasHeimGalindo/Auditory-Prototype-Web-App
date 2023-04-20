import React, { useState } from "react";
import { Grid } from "@mui/material";
import styles from "./MenuSelection.module.scss";
import IconButton from "@mui/material/IconButton";
import ramen from "../assets/footage/bowl.svg";
import rice from "../assets/footage/onigiri.svg";
import drink from "../assets/footage/drink.svg";
import dessert from "../assets/footage/tart.svg";
import ImageCard from "./shared/ImageCard";
import { useCart } from "../Contexts/CartContext";
import { useAudio } from "../Contexts/AudioContext";
import misoRamen from "../assets/footage/ramen/miso.jpg";
import tonkotsuRamen from "../assets/footage/ramen/tonkotsuRamen.jpg";
import veggieRamen from "../assets/footage/ramen/veggie.jpg";
import shoyuRamen from "../assets/footage/ramen/small.jpg";
import karaageRamen from "../assets/footage/ramen/karaageRamen.jpg";
import seafoodRamen from "../assets/footage/ramen/seafoodRamen.jpg";

import beefRice from "../assets/footage/rice/beefRice.jpg";
import shrimpRice from "../assets/footage/rice/shrimpRice.jpg";
import veggieRice from "../assets/footage/rice/veggieRice.jpg";
import salmonRice from "../assets/footage/rice/salmonRice.jpg";

import matchaLatte from "../assets/footage/drinks/matchaLatte.jpg";
import lemonade from "../assets/footage/drinks/lemonade.jpg";
import icedTea from "../assets/footage/drinks/icedTea.jpg";
import mangoSmoothie from "../assets/footage/drinks/mangoSmoothie.jpg";

import matchaCake from "../assets/footage/dessert/matchaCake.jpg";
import matchaCream from "../assets/footage/dessert/matchaCream.jpg";
import sesamePudding from "../assets/footage/dessert/sesamePudding.jpg";
import mochiDonut from "../assets/footage/dessert/mochiDonut.jpg";

//Earcons
import selectItem from "../assets/sounds/Earcon/selectItem.mp3";

//Auditory Icons
import drinks from "../assets/sounds/Auditory Icon/drinks.mp3";
import sizzlingBowl from "../assets/sounds/Auditory Icon/SizzlingBowl.mp3";
import softSizzle from "../assets/sounds/Auditory Icon/soft-sizzle.mp3";
import teaSpoon from "../assets/sounds/Auditory Icon/teaSpoon.mp3";
import popularFlame from "../assets/sounds/Auditory Icon/popularFire.mp3";

const MenuSelection = () => {
  const [selectedCategory, setSelectedCategory] = useState("Ramen");
  const [hoveredDishes, setHoveredDishes] = useState(new Set());

  const { addToCart } = useCart();
  const { setPlaying, setSrc } = useAudio();

  const categories = [
    { id: 1, label: "Ramen", icon: ramen, sound: softSizzle },
    { id: 2, label: "Rice", icon: rice, sound: sizzlingBowl },
    { id: 3, label: "Drinks", icon: drink, sound: drinks },
    { id: 4, label: "Dessert", icon: dessert, sound: teaSpoon },
  ];

  const dishes = [
    {
      id: 1,
      category: "Ramen",
      title: "Spicy Miso Ramen",
      ingredients: "Pork, egg, noodles, miso, chili oil",
      price: "$12.99",
      imageSrc: misoRamen,
    },
    {
      id: 2,
      category: "Ramen",
      title: "Tonkotsu Ramen",
      ingredients: "Pork, egg, noodles, pork bone broth",
      price: "$13.99",
      imageSrc: tonkotsuRamen,
      popular: true,
    },
    {
      id: 3,
      category: "Ramen",
      title: "Vegetarian Ramen",
      ingredients: "Tofu, mushrooms, noodles, miso broth",
      price: "$11.99",
      imageSrc: veggieRamen,
    },
    {
      id: 4,
      category: "Ramen",
      title: "Shoyu Ramen",
      ingredients: "Chicken, noodles, soy sauce broth",
      price: "$12.99",
      imageSrc: shoyuRamen,
    },
    {
      id: 5,
      category: "Ramen",
      title: "Karaage Ramen",
      ingredients: "karaage, noodles, soy sauce broth",
      price: "$13.99",
      imageSrc: karaageRamen,
    },
    {
      id: 6,
      category: "Ramen",
      title: "Seafood Ramen",
      ingredients: "Shrimp, squid, noodles, miso broth",
      price: "$15.99",
      imageSrc: seafoodRamen,
    },

    {
      id: 7,
      category: "Rice",
      title: "Beef Bulgogi Rice Bowl",
      ingredients: "Beef, rice, bulgogi sauce, carrots, spinach",
      price: "$10.99",
      imageSrc: beefRice,
    },
    {
      id: 8,
      category: "Rice",
      title: "Shrimp Fried Rice",
      ingredients: "Shrimp, rice, eggs, peas, carrots",
      price: "$9.99",
      imageSrc: shrimpRice,
    },
    {
      id: 9,
      category: "Rice",
      title: "Vegetable Curry Rice",
      ingredients: "Mixed vegetables, curry sauce, rice",
      price: "$8.99",
      imageSrc: veggieRice,
    },
    {
      id: 10,
      category: "Rice",
      title: "Salmon Teriyaki Rice",
      ingredients: "Salmon, rice, teriyaki sauce, broccoli",
      price: "$12.99",
      imageSrc: salmonRice,
      popular: true,
    },
    {
      id: 11,
      category: "Drinks",
      title: "Iced Matcha Latte",
      ingredients: "Matcha powder, milk, ice",
      price: "$4.99",
      imageSrc: matchaLatte,
      popular: true,
    },
    {
      id: 12,
      category: "Drinks",
      title: "Thai Iced Tea",
      ingredients: "Thai tea, condensed milk, ice",
      price: "$3.99",
      imageSrc: icedTea,
    },
    {
      id: 13,
      category: "Drinks",
      title: "Lemonade",
      ingredients: "Lemon juice, water, sugar",
      price: "$2.99",
      imageSrc: lemonade,
    },
    {
      id: 14,
      category: "Drinks",
      title: "Mango Smoothie",
      ingredients: "Mango, yogurt, honey, ice",
      price: "$5.99",
      imageSrc: mangoSmoothie,
    },

    {
      id: 15,
      category: "Dessert",
      title: "Matcha Ice Cream",
      ingredients: "Mochi, matcha ice cream",
      price: "$4.99",
      imageSrc: matchaCream,
    },
    {
      id: 16,
      category: "Dessert",
      title: "Black Sesame Pudding",
      ingredients: "Black sesame paste, milk, sugar",
      price: "$3.99",
      imageSrc: sesamePudding,
    },
    {
      id: 17,
      category: "Dessert",
      title: "Matcha Cheesecake",
      ingredients: "Cream cheese, matcha powder, sugar",
      price: "$5.99",
      imageSrc: matchaCake,
      popular: true,
    },
    {
      id: 18,
      category: "Dessert",
      title: "Mochi Donuts",
      ingredients: "Mochiko flour, sugar, eggs",
      price: "$4.99",
      imageSrc: mochiDonut,
    },
  ];

  const filteredDishes = dishes.filter(
    (dish) => dish.category === selectedCategory
  );

  const categoryStyle = {
    display: "inline-flex",
    marginRight: "1rem",
    marginBottom: "1rem",
  };

  const playHoverSound = (dish) => {
    if (dish.popular && !hoveredDishes.has(dish.id)) {
      setPlaying(true);
      setSrc(popularFlame);
      setHoveredDishes((prev) => new Set([...prev, dish.id]));
    }
  };

  const playClickSound = () => {
    setPlaying(true);
    setSrc(selectItem);
  };

  return (
    <div className={styles.menuSelectionWrapper}>
      <div className={styles.menuSelection}>
        {categories.map((category) => (
          <div key={category.id} style={categoryStyle}>
            <IconButton
              onClick={() => {
                setSelectedCategory(category.label);
                setSrc(category.sound);
                setPlaying(true);
              }}
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img src={category.icon} alt={category.label} height="32" />
              {category.label}
            </IconButton>
          </div>
        ))}
      </div>

      <div className={styles.categoryText}>Choose {selectedCategory}</div>

      <Grid container spacing={2}>
        {filteredDishes.map((dish) => (
          <Grid item key={dish.id} xs={12} sm={6} md={4}>
            <ImageCard
              title={dish.title}
              ingredients={dish.ingredients}
              price={dish.price}
              imageSrc={dish.imageSrc}
              popular={dish.popular}
              onClick={() => {
                playClickSound();
                addToCart(dish);
              }}
              onMouseEnter={() => playHoverSound(dish)}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MenuSelection;
