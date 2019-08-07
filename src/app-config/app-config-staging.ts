import { IEndPointKeys } from '../models';

const endPoints: IEndPointKeys = {
    base: 'https://EcpWebApplicationsApi.azurewebsites.net/api',
    baseWebSocket: 'wss://localhost:44370/',
    baseSignalRHubs: 'https://localhost:44370' ,
    goCardlessKey: 'TbmJx946zYNa_7GKowKDnBVuzY3L7JuBylRtFgzr',
};

const devConfig = {  endPoints,};

export default devConfig;

//this is called by config/app-config.ts which uses the value set in .env (file is at root level of the project) for REACT_APP_ENV
//to decide which of these app-config files to use.The build scripts in package.json set this value as a first step (you can see this) based on what sort of build it is.  