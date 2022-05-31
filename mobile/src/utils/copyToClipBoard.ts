/* eslint-disable import/no-named-as-default-member */
import * as Clipboard from 'expo-clipboard';

export const copyToClipBoard = async (text: string) => {
  await Clipboard.setStringAsync(text);
};
