import { ReactNode, FunctionComponent } from 'react';

export type LoadingFallbackProps = {
  isLoading?: boolean;
  fallback: ReactNode;
};

export const LoadingFallback: FunctionComponent<LoadingFallbackProps> = ({
  isLoading = false,
  children,
  fallback,
}) => {
  if (isLoading) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
