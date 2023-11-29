import React from "react";
import { IonContent, IonSkeletonText, IonThumbnail } from "@ionic/react";

export const SkeletonRecipeDetail: React.FC = () => {
  const renderSkeletonText = (width: string) => (
    <IonSkeletonText style={{ width }} />
  );

  return (
    <IonContent className="recipe">
      {/* Recipe Image */}
      <div className="recipe-image">
        <IonThumbnail aria-hidden="true">
          <IonSkeletonText animated />
        </IonThumbnail>
      </div>

      {/* Body */}
      <div className="p-content flex flex-col gap-content">
        {/* Header */}
        <div className="flex flex-wrap gap-content items-start justify-between">
          {/* Title */}
          <div>
            {renderSkeletonText("80%")}
            {renderSkeletonText("50%")}
          </div>

          {/* Badges */}
          <div className="flex gap-content flex-wrap">
            {Array.from({ length: 3 }).map((_, index) => (
              <IonSkeletonText
                key={index}
                style={{
                  width: "50px",
                  height: "20px",
                  margin: "0.5rem 0.5rem",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* List of Details */}
      <div className="p-content">
        {Array.from({ length: 5 }).map((_, index) => (
          <IonSkeletonText
            key={index}
            style={{ width: "100%", margin: "0.5rem 0" }}
          />
        ))}
      </div>
    </IonContent>
  );
};
