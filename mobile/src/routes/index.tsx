import { StackRoutes, StackPrivateRoutes } from './stack.routes';

import { useAuth } from '@src/hooks/useAuth';

export const Routes = () => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <StackPrivateRoutes />;
  }

  return <StackRoutes />;
};
