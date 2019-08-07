import { ISite, IActive } from '../../models'

export interface ISitesState {
  sites : Array<ISite>;
  isProcessing : boolean;
  searchText: string;
  active: IActive;
  clientId: number | null;
}

const defaultState: ISitesState = {
    sites: [],
    isProcessing : false,
    searchText: '',
    active: {'label':'Active','value':1},
    clientId: 0
}

export const getDefaultSitesDataState = (options?: any) => { return {...defaultState,...options }; };