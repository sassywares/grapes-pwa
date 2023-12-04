import { IonRouterOutlet } from "@ionic/react";
import { render } from "@testing-library/react";
import { IonReactRouter } from "@ionic/react-router";

/**
 * Designs a method that renders a component with default props and returns a method that can be used to render the designed component with custom props.
 * @param Component The component to render
 * @param defaultProps The default props to use when rendering the component
 * @returns A method that can be used to render the component with custom props
 */
export function renderComponent<P>(
  Component: React.ComponentType<P>,
  defaultProps: JSX.IntrinsicAttributes & P
) {
  return (props: Partial<P> = {}) => {
    return render(<Component {...defaultProps} {...props} />);
  };
}

/**
 * Designs a method that renders a component inside a router with default props and returns a method that can be used to render the designed component with custom props.
 * @param Component The component to render
 * @param defaultProps The default props to use when rendering the component
 * @returns A method that can be used to render the component with custom props
 */
export function renderComponentInRouter<P>(
  Component: React.ComponentType<P>,
  defaultProps: JSX.IntrinsicAttributes & P
) {
  return (props: Partial<P> = {}) => {
    return render(
      <IonReactRouter>
        <IonRouterOutlet>
          <Component {...defaultProps} {...props} />
        </IonRouterOutlet>
      </IonReactRouter>
    );
  };
}
