import { useState } from 'react';

import { StackRoutes, StackPrivateRoutes } from './stack.routes';

export const Routes = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  if (isLoggedIn) {
    return <StackPrivateRoutes />;
  }

  return <StackRoutes />;
};
