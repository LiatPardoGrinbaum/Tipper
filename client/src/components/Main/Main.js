import home from "../../assets/categories/home.jpg";
import fitness from "../../assets/categories/fitness.jpg";
import food from "../../assets/categories/food.jpg";
import travel from "../../assets/categories/travel.jpg";
import wellness from "../../assets/categories/wellness.jpg";
import study from "../../assets/categories/study.jpg";
import React from "react";
import { CategoryDiv } from "./CategoryDiv";
import { NavLink } from "react-router-dom";

export const Main = () => {
  //?maybe- add to different folder of consts and export it
  const categorites = [
    {
      name: "Home&Garden",
      image: home,
    },
    {
      name: "Fitness",
      image: fitness,
    },
    {
      name: "Food",
      image: food,
    },
    {
      name: "Travel",
      image: travel,
    },
    {
      name: "Wellness",
      image: wellness,
    },
    {
      name: "Study",
      image: study,
    },
  ];
  const insertCategories = () => {
    return categorites.map((category) => {
      return (
        <React.Fragment key={category.name}>
          <CategoryDiv category={category} />
        </React.Fragment>
      );
    });
  };
  return (
    <>
      <h1>
        Welcome to <span>Tipper</span>
      </h1>
      <h2>For awesome tips, please select a category:</h2>
      <div className="categories-container">{insertCategories()}</div>
      <h3>
        Can't decide?{" "}
        <NavLink
          to={{
            pathname: `/allcategories`,
          }}>
          To all categories
        </NavLink>
      </h3>
    </>
  );
};
