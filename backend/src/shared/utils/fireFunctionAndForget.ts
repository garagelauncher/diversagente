export const fireFunctionAndForget = (
  asyncCallback: CallableFunction,
  argumentsToForward: any,
) => {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  asyncCallback(argumentsToForward);
};
