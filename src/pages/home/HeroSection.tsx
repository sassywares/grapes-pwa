import { IonButton } from "@ionic/react";

export function HeroSection({
  openSearchModal,
}: {
  openSearchModal: () => void;
}) {
  return (
    <section className="p-content flex flex-col gap-content items-center md:items-start my-10 container">
      <header>
        <h1 className="text-center md:text-left max-w-md text-4xl leading-normal md:leading-snug">
          <span className="underline decoration-purple-500">Grape Recipes</span>{" "}
          For{" "}
          <strong>
            <em>Great People</em>
          </strong>{" "}
          Like You 🍇
        </h1>
        <p className="text-center md:text-left text-secondary md:mt-2">
          Find the best midnight snacks, breakfasts, lunches, and dinners here!
        </p>
      </header>
      <div className="flex gap-content justify-center md:justify-start w-full">
        <IonButton
          color="tertiary"
          href="#popularRecipes"
          className="w-full sm:w-auto"
        >
          Browse Recipes
        </IonButton>
        <IonButton
          color="tertiary"
          fill="outline"
          className="w-full sm:w-auto"
          onClick={openSearchModal}
        >
          Search Recipes
        </IonButton>
      </div>
    </section>
  );
}
