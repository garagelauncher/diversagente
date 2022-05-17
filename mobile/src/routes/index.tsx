import { StackRoutes } from './stack.routes';
import { TabRoutes } from './tabs.routes';

import { useAuth } from '@src/hooks/useAuth';

export const Routes = () => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <TabRoutes />;
  }

  return <StackRoutes />;
};
