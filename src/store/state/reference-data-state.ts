import { IProductFrequency, ITown, IClient } from '../../models'

export interface IReferenceDataState {
  clients: Array<IClient>;
  productFrequencies: Array<IProductFrequency>;
  siteTowns: Array<ITown>;
}

const defaultState: IReferenceDataState = {
    clients:[],
    productFrequencies: [],
    siteTowns: []
}

export const getDefaultReferenceDataState = (options?: any) => { return {...defaultState,...options }; };