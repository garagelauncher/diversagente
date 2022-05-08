import { useContext } from 'react';

import { AuthContext, AuthContextProps } from '@src/contexts/AuthContext';

export function useAuth(): AuthContextProps {
  return useContext(AuthContext);
}
