import { IPermit } from '../../models'

export interface IPermitState {
  permit: IPermit | null;
  isProcessing : boolean;
  isSuccess: boolean;
}

const defaultState: IPermitState = {
    permit: null,
    isProcessing: false,
    isSuccess: false
}

export const getDefaultPermitDataState = (options?: any) => { return {...defaultState,...options }; };