import { FunctionComponent, useState } from 'react';

import { useTimeout } from '@src/hooks/useTimeout';

export type TimeoutRenderProps = {
  timeoutInSeconds: number;
  children: React.ReactNode;
  shoudlRenderInitially?: boolean;
};

export const TimeoutRender: FunctionComponent<TimeoutRenderProps> = ({
  timeoutInSeconds = 1,
  children,
  shoudlRenderInitially = true,
}) => {
  const [isVisible, setIsVisible] = useState(shoudlRenderInitially);
  useTimeout(() => {
    setIsVisible(!shoudlRenderInitially);
  }, timeoutInSeconds * 1000);

  return isVisible ? <>{children}</> : null;
};
