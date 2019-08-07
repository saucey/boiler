import { IPermitProduct, ISiteLookup, ICustomer, IPermit, IPurchase, IPreProduct } from '../../models'

export interface IPurchaseState {
  customer: ICustomer | null;
  siteLocationSearch: Array<ISiteLookup>;
  products : Array<IPermitProduct>;
  product: IPermitProduct | null;
  permit: IPermit | null;
  isProcessing: boolean;
  town: any;
  purchase: IPurchase | null;
  pendingPayment: boolean;
  purchaseUpdate: boolean;
  preProduct: IPreProduct | null;
}

const defaultState: IPurchaseState = {
    customer: null,
    siteLocationSearch: [],
    products: [],
    product: null,
    permit: null,
    isProcessing: false,
    town: [],
    purchase: null, 
    pendingPayment: false,
    purchaseUpdate: false,
    preProduct: null
}

export const getDefaultPurchaseDataState = (options?: any) => { return {...defaultState,...options }; };