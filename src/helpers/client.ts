import { IClient } from '../models';

const CLIENT_ID = `${process.env.REACT_APP_CLIENT_ID}`
const CLIENT_NAME = `${process.env.REACT_APP_CLIENT_NAME}`

export const getClient = (): IClient => {
    return { clientId: parseInt(CLIENT_ID), clientName: CLIENT_NAME, shouldShowSites: false };
    //     let state: IAppState = store.getState() as IAppState;
    //     return state.appContainer.client ? state.appContainer.client: {clientId:23, clientName: 'Euro Car Parks',shouldShowSites:false};
};