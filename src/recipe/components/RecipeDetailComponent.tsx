import { log } from "@/utils";
import { Nutrient, Recipe } from "../recipeTypes";
import { time, flame, heart } from "ionicons/icons";

// Components
import {
  IonContent,
  IonCardTitle,
  IonCardContent,
  IonBadge,
  IonIcon,
  IonChip,
  IonItemDivider,
  IonList,
  IonListHeader,
  IonLabel,
  IonItem,
  IonItemGroup,
  IonNote,
} from "@ionic/react";
import { RecipeImage } from "./RecipeImage";

export function RecipeDetailComponent(recipe: Recipe) {
  const {
    healthScore,
    image,
    readyInMinutes,
    servings,
    summary,
    title,
    nutrients,
    aggregateLikes,
  } = recipe;

  const nutrientsList = JSON.parse(nutrients || "[]");

  const calories = nutrientsList.find((nutrient: Nutrient) => {
    return nutrient.name === "Calories";
  });

  const protein = nutrientsList.find((nutrient: Nutrient) => {
    return nutrient.name === "Protein";
  });

  const carbs = nutrientsList.find((nutrient: Nutrient) => {
    return nutrient.name === "Carbohydrates";
  });

  return (
    <IonContent className="recipe">
      <RecipeImage src={image} alt={title} />

      {/* Body */}
      <div className="p-content flex flex-col gap-content">
        {/* Header */}
        <div className="flex flex-wrap gap-content items-center justify-between">
          {/* Title */}
          <h1>{title}</h1>
          {/* Badges */}
          <div className="flex gap-content">
            {readyInMinutes && readyInMinutes > 0 && (
              <IonChip color="danger">
                <IonIcon icon={time} aria-hidden="true" />
                {readyInMinutes} min
              </IonChip>
            )}
            {calories && (
              <IonChip color="warning">
                <IonIcon icon={flame} aria-hidden="true" />
                {calories.amount.toFixed(0)} {calories.unit}
              </IonChip>
            )}
            {aggregateLikes && aggregateLikes > 0 && (
              <IonChip color="tertiary">
                <IonIcon icon={heart} aria-hidden="true" />
                {aggregateLikes}
              </IonChip>
            )}
          </div>
        </div>
        {/* Summary */}
        {/* {summary && (
          <p
            className="text-secondary"
            dangerouslySetInnerHTML={{
              __html: summary,
            }}
          />
        )} */}
      </div>
      <IonList lines="full">
        <IonListHeader>
          <IonLabel>Details</IonLabel>
        </IonListHeader>
        {/* Nutrients */}
        <IonItemGroup>
          <IonItemDivider>
            <IonLabel>Nutrition / serving</IonLabel>
          </IonItemDivider>
          {/* Calories */}
          {calories && (
            <IonItem>
              <IonLabel>Calories</IonLabel>
              <IonBadge color="warning">
                {calories?.amount.toFixed(0)} {calories?.unit}
              </IonBadge>
            </IonItem>
          )}
          {/* Protein */}
          {protein && (
            <IonItem>
              <IonLabel>Protein</IonLabel>
              <IonBadge color="warning">
                {protein?.amount.toFixed(0)} {protein?.unit}
              </IonBadge>
            </IonItem>
          )}
          {/* Carbs */}
          {carbs && (
            <IonItem>
              <IonLabel>Carbs</IonLabel>
              <IonBadge color="warning">
                {carbs?.amount.toFixed(0)} {carbs?.unit}
              </IonBadge>
            </IonItem>
          )}
        </IonItemGroup>
        {/* Sustainability */}
      </IonList>
    </IonContent>
  );
}
