import { useRef, useState, useEffect } from "react";
import { IonThumbnail, IonSkeletonText } from "@ionic/react";

export function RecipeImage({ src, alt }: { src?: string; alt?: string }) {
  const imgRef = useRef<HTMLImageElement>(null);

  // State: Loading state
  // If there is an image, set the loading state to true
  const [isLoading, setIsLoading] = useState(!src);

  /**
   * Effect: Lazy load image
   */
  useEffect(() => {
    if (!src) return;

    // Create a new image and set the source to the image url
    const img = new Image();
    img.src = src;

    const handleLoad = () => setIsLoading(false);

    const handleError = () => {
      setIsLoading(false);

      // Set the image to the fallback image
      if (imgRef.current) {
        imgRef.current.src = "/placeholder.jpg";
      }
    };

    img.addEventListener("load", handleLoad);
    img.addEventListener("error", handleError);

    // Cleanup
    return () => {
      img.removeEventListener("load", handleLoad);
      img.removeEventListener("error", handleError);
    };
  }, []);

  return isLoading ? (
    <IonThumbnail>
      <IonSkeletonText animated />
    </IonThumbnail>
  ) : (
    <img alt={alt} src={src} ref={imgRef} />
  );
}
