import { ReactNode, FunctionComponent } from 'react';

export type ConditionallyRenderProps = {
  condition: boolean;
  trueComponent: ReactNode;
  falseComponent: ReactNode;
};

export const ConditionallyRender: FunctionComponent<
  ConditionallyRenderProps
> = ({ condition = false, trueComponent, falseComponent }) => {
  if (condition) {
    return <>{trueComponent}</>;
  }

  return <>{falseComponent}</>;
};
