import { log } from "@/utils";
import {
  AnalyzedInstructions,
  Nutrient,
  Recipe,
  RecipeEquipment,
  RecipeIngredient,
} from "../recipeTypes";
import {
  time,
  flame,
  heart,
  leaf,
  star,
  thumbsDown,
  thumbsUp,
} from "ionicons/icons";

// Components
import {
  IonBadge,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonChip,
  IonContent,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonList,
  IonListHeader,
} from "@ionic/react";
import { RecipeImage } from "./RecipeImage";
import { useInstructions, useNutrients } from "../hooks";

export function RecipeDetail(recipe: Recipe) {
  const {
    aggregateLikes,
    analyzedInstructions,
    image,
    nutrients,
    readyInMinutes,
    title,
    healthScore,
    servings = 1,
    sustainable,
    vegan,
  } = recipe;

  const { calories, carbs, protein } = useNutrients(nutrients);
  const { steps, equipment, ingredients } =
    useInstructions(analyzedInstructions);

  if (steps) {
    // Get all equipment and ingredients
    steps.forEach((step) => {
      // Add equipment if not already in list
      step.equipment.forEach((e) => {
        if (!equipment.find((eq) => eq.name === e.name)) {
          equipment.push(e);
        }
      });

      // Add ingredients if not already in list
      step.ingredients.forEach((i) => {
        if (!ingredients.find((ing) => ing.name === i.name)) {
          ingredients.push(i);
        }
      });
    });
  }

  return (
    <IonContent className="recipe">
      <section className="container">
        <RecipeImage src={image} alt={title}>
          {/* Image Badges */}
          <div className="absolute p-content bottom-0 left-0 w-full flex gap-content flex-wrap">
            {/* Health Score */}
            {healthScore &&
              healthScore > 0 &&
              (healthScore > 66 ? (
                <IonBadge color="success">
                  <IonIcon icon={heart} aria-hidden="true" />
                  Very Healthy
                </IonBadge>
              ) : healthScore > 33 ? (
                <IonBadge color="warning">
                  <IonIcon icon={heart} aria-hidden="true" />
                  Healthy
                </IonBadge>
              ) : (
                <IonBadge color="danger">
                  <IonIcon icon={heart} aria-hidden="true" />
                  Unhealthy
                </IonBadge>
              ))}
            {/* Sustainable */}
            {sustainable == 1 && (
              <IonBadge color="success">
                <IonIcon icon={leaf} aria-hidden="true" />
                Sustainable
              </IonBadge>
            )}
            {/* Vegan */}
            {vegan == 1 && (
              <IonBadge color="success">
                <IonIcon icon={leaf} aria-hidden="true" />
                Vegan
              </IonBadge>
            )}
          </div>
        </RecipeImage>
      </section>

      {/* Body */}
      <div className="p-content flex flex-col gap-content container">
        {/* Header */}
        <div className="flex flex-wrap gap-content items-start justify-between">
          {/* Title */}
          <div>
            <h1>{title}</h1>
            <p className="text-secondary mt-1">
              {servings} Serving{servings > 1 ? "s" : ""}
            </p>
          </div>
          {/* Badges */}
          <div className="flex gap-content flex-wrap">
            {readyInMinutes && readyInMinutes > 0 && (
              <IonChip color="primary">
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
      <IonList lines="full" className="container">
        <IonListHeader>
          <IonLabel>
            <h2>Details</h2>
          </IonLabel>
        </IonListHeader>
        {/* Nutrients */}
        {(calories || protein || carbs) && (
          <IonItemGroup>
            <IonItemDivider>
              <IonLabel>🔥 Nutrition</IonLabel>
            </IonItemDivider>
            {/* Calories */}
            {calories && (
              <IonItem>
                <IonLabel>Calories</IonLabel>
                <IonBadge color="tertiary">
                  {calories?.amount.toFixed(0)} {calories?.unit}
                </IonBadge>
              </IonItem>
            )}
            {/* Protein */}
            {protein && (
              <IonItem>
                <IonLabel>Protein</IonLabel>
                <IonBadge color="tertiary">
                  {protein?.amount.toFixed(0)} {protein?.unit}
                </IonBadge>
              </IonItem>
            )}
            {/* Carbs */}
            {carbs && (
              <IonItem>
                <IonLabel>Carbs</IonLabel>
                <IonBadge color="tertiary">
                  {carbs?.amount.toFixed(0)} {carbs?.unit}
                </IonBadge>
              </IonItem>
            )}
          </IonItemGroup>
        )}
        {/* Equipment */}
        {equipment && equipment.length > 0 && (
          <IonItemGroup>
            <IonItemDivider>
              <IonLabel>🧰 Equipment</IonLabel>
            </IonItemDivider>
            {equipment.map(({ name }, i) => (
              <IonItem key={name}>
                <IonLabel className="ion-text-wrap">
                  <h3 className="capitalize">
                    <span className="font-bold">{i + 1}. </span> {name}
                  </h3>
                </IonLabel>
              </IonItem>
            ))}
          </IonItemGroup>
        )}
        {/* Ingredients */}
        {ingredients && ingredients.length > 0 && (
          <IonItemGroup>
            <IonItemDivider>
              <IonLabel>🍱 Ingredients</IonLabel>
            </IonItemDivider>
            {ingredients.map(({ name }, i) => (
              <IonItem key={name}>
                <IonLabel className="ion-text-wrap">
                  <h3 className="capitalize">
                    <span className="font-bold">{i + 1}. </span> {name}
                  </h3>
                </IonLabel>
              </IonItem>
            ))}
          </IonItemGroup>
        )}
        {/* Instructions */}
        {steps && steps.length > 0 && (
          <IonItemGroup>
            <IonItemDivider>
              <IonLabel>📜 Instructions</IonLabel>
            </IonItemDivider>
            {steps.map(({ step, number }, i) => (
              <IonItem
                key={number}
                // No lines on last item
                lines={i === steps.length - 1 ? "none" : "full"}
              >
                <IonLabel className="ion-text-wrap">
                  <h3>Step {number}</h3>
                  <p
                    className="text-secondary"
                    dangerouslySetInnerHTML={{
                      __html: step,
                    }}
                  />
                </IonLabel>
              </IonItem>
            ))}
          </IonItemGroup>
        )}
      </IonList>
    </IonContent>
  );
}
