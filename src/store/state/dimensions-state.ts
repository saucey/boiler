// import { IPermitProduct, ISiteLookup, ICustomer, IPermit } from '../../models'

export interface IDimensionsState {
    footerHeight: number;
}

const defaultState: IDimensionsState = {
    footerHeight: 0,
}

export const getDefaultDimensionsState = (options?: any) => { return {...defaultState,...options }; };