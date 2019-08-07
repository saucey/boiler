import { IGeoLocation } from "../../models/geolocation";

export interface ILocationState {
    location: IGeoLocation | null;
}

export const defaultState: ILocationState = { 
    location: { latitude:0, longitude: 0 }
};

export const getDefaultLocationDataState = (options?: any) => { return {...defaultState,...options }; };