import { IPermit } from '../../models'

export interface IPermitsState {
  permits : Array<IPermit>;
  customerId: number | null;
  selectedPermit: IPermit | null;
}

const defaultState: IPermitsState = {
    permits: [],
    customerId: null,
    selectedPermit: null
}

export const getDefaultPermitsDataState = (options?: any) => { return {...defaultState,...options }; };