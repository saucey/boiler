import { fetchPermitProductEpic } from './fetch-product-epic';
import { fetchPermitsEpic, fetchPermitEpic } from './fetch-permits-epic';
import { fetchCustomerEpic } from './fetch-customers-epic';
import { appInitializeEpic, appInitializingEpic, appInitializedEpic } from './initialize-epic';
import {
    fetchRefDataProductFrequenciesEpic,
    fetchRefDataSiteTownsForClientEpic,
    fetchRefDataClientsEpic
} from './fetch-ref-data-epic';
import { upsertCustomerEpic, upsertCustomerSuccessEpic } from './upsert-customer-epic'
import { upsertPermitEpic, upsertPermitSuccessEpic, upsertPermitEpicUpdate } from './upsert-permit-epic';
import { fetchSitesForClientByLocationEpic,fetchSitesForClientByLocationSuccessEpic } from './fetch-sites-for-client-epic';
import { fetchPermitProductsForSiteEpic } from './fetch-products-for-site-epic';
import { fetchGeoLocationEpic } from './location-epic';
import { appRegisterEpic, appLoginEpic, appFetchCustomerProductEpic } from './login-epic';
import { appPasswordResetrequestEpic, appResetPasswordEpic } from './recover-epic';
import { insertCardChargeEpic, insertDirectDebitCustomerEpic, insertDirectDebitSubscriptionErrorEpic, insertDirectDebitSubscriptionEpic } from './insert-card-charge-epic';

export const epics = {
    appInitializeEpic, appInitializingEpic, appInitializedEpic,
    fetchRefDataSiteTownsForClientEpic, fetchRefDataProductFrequenciesEpic, fetchRefDataClientsEpic,
    fetchSitesForClientByLocationEpic,
    fetchSitesForClientByLocationSuccessEpic,
    fetchPermitProductsForSiteEpic,
    fetchPermitProductEpic,
    fetchCustomerEpic,
    upsertCustomerEpic,
    upsertCustomerSuccessEpic,
    insertDirectDebitCustomerEpic,
    fetchPermitsEpic,
    fetchPermitEpic,
    upsertPermitEpic,
    upsertPermitSuccessEpic,
    upsertPermitEpicUpdate,
    fetchGeoLocationEpic,
    appLoginEpic,
    appFetchCustomerProductEpic,
    appRegisterEpic,
    insertDirectDebitSubscriptionErrorEpic,
    insertDirectDebitSubscriptionEpic,
    insertCardChargeEpic,
    appPasswordResetrequestEpic,
    appResetPasswordEpic,
};