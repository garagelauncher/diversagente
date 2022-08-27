import { useAuth } from '@src/hooks/useAuth';

import { StackRoutes } from './stack.routes';
import { TabRoutes } from './tabs.routes';

export const Routes = () => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <TabRoutes />;
  }
  return <TabRoutes />;
  // return <StackRoutes />;
};
