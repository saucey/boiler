
export interface ILanguageLocaleState {
  language: string;
}

const defaultState: ILanguageLocaleState = {
    language: 'en',
}

export const getDefaultPermitNewDataState = (options?: any) => { return {...defaultState,...options }; };