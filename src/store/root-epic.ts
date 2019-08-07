import { combineEpics } from 'redux-observable';
import { fetchPermitProductEpic, fetchPrePopulatedProductEpic } from './epics/fetch-product-epic'
import { fetchPermitsEpic, fetchPermitEpic } from './epics/fetch-permits-epic'
import { fetchCustomerEpic } from './epics/fetch-customers-epic'
import { fetchRefDataProductFrequenciesEpic,fetchRefDataSiteTownsForClientEpic, fetchRefDataClientsEpic} from './epics/fetch-ref-data-epic'
import { appInitializeEpic, appInitializingEpic, appInitializedEpic } from './epics/initialize-epic'
import { upsertCustomerEpic, upsertCustomerSuccessEpic } from './epics/upsert-customer-epic'
import { upsertPermitEpic, upsertPermitSuccessEpic, upsertPermitEpicUpdate} from './epics/upsert-permit-epic'
import { fetchSitesForClientByLocationEpic, fetchSitesForClientByLocationSuccessEpic } from './epics/fetch-sites-for-client-epic';
import { fetchPermitProductsForSiteEpic } from './epics/fetch-products-for-site-epic';
import { fetchGeoLocationEpic } from './epics/location-epic';
import { appLoginEpic, appRegisterEpic, appFetchCustomerProductEpic } from './epics/login-epic';
import { appPasswordResetrequestEpic, appResetPasswordEpic } from './epics/recover-epic';
import {insertCardChargeEpic, insertDirectDebitCustomerEpic, insertDirectDebitSubscriptionErrorEpic, insertDirectDebitSubscriptionEpic} from './epics/insert-card-charge-epic';

export const rootEpic = combineEpics(
    appInitializeEpic, appInitializingEpic, appInitializedEpic,
    fetchRefDataSiteTownsForClientEpic,fetchRefDataProductFrequenciesEpic, fetchRefDataClientsEpic,
    fetchSitesForClientByLocationEpic,
    fetchSitesForClientByLocationSuccessEpic,
    fetchPermitProductsForSiteEpic,
    fetchPermitProductEpic,
    fetchPrePopulatedProductEpic,
    upsertPermitEpic, upsertPermitSuccessEpic,upsertPermitEpicUpdate,
    insertDirectDebitCustomerEpic,
    insertCardChargeEpic,
    fetchPermitsEpic, fetchPermitEpic,
    fetchCustomerEpic, upsertCustomerEpic, upsertCustomerSuccessEpic,
    fetchGeoLocationEpic,
    appPasswordResetrequestEpic,
    appResetPasswordEpic,
    appLoginEpic, appFetchCustomerProductEpic, appRegisterEpic, insertDirectDebitSubscriptionErrorEpic, insertDirectDebitSubscriptionEpic
);