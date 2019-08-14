export const languageLocaleActions = {
    SET_LANGUAGE: 'SET_LANGUAGE',
}

export const setLanguageLocale = (language: string): any => ({
    type: languageLocaleActions.SET_LANGUAGE,
    payload: language
});