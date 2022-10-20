export const fireFunctionAndForget = <
  ArgumentsType extends readonly any[],
  ReturnValueType extends Promise<unknown>,
>(
  asyncCallback: (inputArgs: ArgumentsType) => ReturnValueType,
  argumentsToForward: ArgumentsType,
) => {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  asyncCallback(argumentsToForward);
};
