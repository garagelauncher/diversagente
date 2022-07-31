/* eslint-disable no-prototype-builtins */
/* eslint-disable import/no-named-as-default-member */
import I18n from 'i18n-js';
import { Platform, NativeModules } from 'react-native';

import * as enUs from './en-US';
import * as ptBr from './pt-BR';

export const normalizeTranslate = {
  en_US: 'en_US',
  pt_BR: 'pt_BR',
  en: 'en_US',
  pt_US: 'pt_BR',
};

const getLanguageByDevice = (): string => {
  if (Platform.OS === 'ios') {
    return NativeModules.SettingsManager.settings.AppleLocale;
  }

  return NativeModules.I18nManager.localeIdentifier;
};

I18n.translations = {
  en_US: enUs,
  pt_BR: ptBr,
};

const setLanguageToI18n = (
  selectedLanguage?: keyof typeof normalizeTranslate,
) => {
  const language =
    selectedLanguage ??
    (getLanguageByDevice() as keyof typeof normalizeTranslate);
  const translateNormalize = normalizeTranslate[language];

  const iHaveThisLanguage =
    I18n.translations.hasOwnProperty(translateNormalize);

  if (iHaveThisLanguage) {
    I18n.locale = translateNormalize;
  } else {
    I18n.defaultLocale = 'en_US';
  }
};

setLanguageToI18n();

export const translate = (key: string) => I18n.t(key);
