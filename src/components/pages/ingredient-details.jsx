import React, { useCallback, useState } from "react";
// import { Navigate } from 'react-router-dom';

import styles from "./ingredient-details.module.css";

export default function IngredientDetails() {

  //todo
  const ingredient = {
    _id: "643d69a5c3f7b9001cfa0941",
    name: "Биокотлета из марсианской Магнолии",
    type: "main",
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: "https://code.s3.yandex.net/react/code/meat-01.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
    __v: 0,
  };

  return (
    <>
      <div className={styles.container}>
        <p className={`${styles.title} text text_type_main-large`}>
          Детали ингредиента
        </p>
        <img src={ingredient.image_large} alt="Изображение ингредиента" />
        <p className="text text_type_main-medium mt-4">{ingredient.name}</p>
        <ul className={`${styles.details} mt-8 mb-15`}>
          <li className={styles.detail}>
            <p className="text text_type_main-default text_color_inactive">
              Калории,ккал
            </p>
            <p className="text text_type_main-default text_color_inactive">
              {ingredient.calories}
            </p>
          </li>
          <li className={styles.detail}>
            <p className="text text_type_main-default text_color_inactive">
              Белки, г
            </p>
            <p className="text text_type_main-default text_color_inactive">
              {ingredient.proteins}
            </p>
          </li>
          <li className={styles.detail}>
            <p className="text text_type_main-default text_color_inactive">
              Жиры, г
            </p>
            <p className="text text_type_main-default text_color_inactive">
              {ingredient.fat}
            </p>
          </li>
          <li className={styles.detail}>
            <p className="text text_type_main-default text_color_inactive">
              Углеводы, г
            </p>
            <p className="text text_type_main-default text_color_inactive">
              {ingredient.carbohydrates}
            </p>
          </li>
        </ul>
      </div>
    </>
  );
}
