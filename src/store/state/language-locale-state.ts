
export interface ILanguageLocaleState {
  language: string;
  defaultLanguage: string;
  languageHasToggled: boolean;
}

const defaultState: ILanguageLocaleState = {
    language: 'en',
    defaultLanguage: 'en',
    languageHasToggled: false,
}

export const getDefaultLanguageLocaleState = (options?: any) => { return {...defaultState,...options }; };