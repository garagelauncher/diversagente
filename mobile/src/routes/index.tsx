import { StackRoutes } from './stacks';
import { TabRoutes } from './tabs';

import { useAuth } from '@src/hooks/useAuth';

export const Routes = () => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <TabRoutes />;
  }
  return <TabRoutes />;
  // return <StackRoutes />;
};
