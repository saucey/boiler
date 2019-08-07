import { IPermit } from '../../models'

export interface IPermitNewState {
  permit: IPermit | null;
  isProcessing : boolean;

}

const defaultState: IPermitNewState = {
    permit: null,
    isProcessing: false
}

export const getDefaultPermitNewDataState = (options?: any) => { return {...defaultState,...options }; };