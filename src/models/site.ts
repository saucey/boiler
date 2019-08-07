import {  IClient, ICountry, ISiteOperation, ISiteType, ISiteStatus, ISiteMedia } from '.'

export interface ISiteLookup 
{
    siteId : number;
    siteName : string;
    addressLine1: string;
    town: string;
    client: IClient | null;
    latitude: number;
    longitude: number;
}

export interface ISite extends ISiteLookup 
{
    // siteTypeId: number;
    // siteStatusId: number;
    // clientId: number;
    // clientName: string;
    // dateOpened: any;
    // dateClosed: any;
    // siteOperationId: number;
    // siteOperationName: string;
    isNewSite: boolean;
    cil: number;
    cilDays: number;
    addressLine1: string;
    addressLine2: string;
    // regionId: number;
    // regionName: string;
    county: string;
    postCode: string;
    // countryId: number;
    // countryName: string;
    country: ICountry | null;
    siteOperation: ISiteOperation | null;
      
    siteType: ISiteType | null;
    siteStatus: ISiteStatus | null;
    spaceRegular: number;
    spaceDisabled: number;
    spaceParentToddler: number;
    spaceStaff: number;
    // spaceTotal: number;
    dvlaRepeatCheck: boolean;
    dvlaRepeatLimit: boolean;
    isProtectionOfFreedom: boolean;
    // siteComents: string;
    // gracePeriod: number;
    // isPaidParking: boolean;
    // isOvernightStay: boolean;
    // overnightStayValue: number;
    // isProcessCOs: boolean;
    // isUseCarWeb: boolean;

    siteMediaList: Array<ISiteMedia>;
}

export const newSite: ISite = {
    siteId : 0,
    isNewSite: true,
    siteName : '',
    // siteTypeId: 0,
    // siteStatusId: 0,
    client: null,
    // clientName: '',
    // dateOpened: null,
    // dateClosed: null,
    // siteOperationId: 0,
    // siteOperationName: '',
    cil: 0,
    cilDays: 0,
    addressLine1: '',
    addressLine2: '',
    town: '',
    county: '',
    // regionId: 0,
    // regionName: '',
    postCode: '',
    // countryId: 0,
    // countryName: '',
    country:null,
    siteOperation: null,
    siteType: null,
    siteStatus: null,
    spaceRegular: 0,
    spaceDisabled: 0,
    spaceParentToddler: 0,
    spaceStaff: 0,
    // spaceTotal: 0,
    dvlaRepeatCheck: false,
    dvlaRepeatLimit: false,
    isProtectionOfFreedom: false,
    latitude:0,
    longitude:0,
    // siteComents: '',
    // gracePeriod: 0,
    // isPaidParking: false,
    // isOvernightStay: false,
    // overnightStayValue: 0,
    // isProcessCOs: false,
    // isUseCarWeb: false

    siteMediaList: []
}

