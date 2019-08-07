import { ISiteMediaStatus, ISiteMediaCategory } from '.'
import { dateTimeHelper } from '../helpers';

export interface ISiteMedia 
{
    siteMediaId: number;
    siteId: number;
    siteMediaCategoryId: number;
    siteMediaCategoryName: string;
    siteMediaStatusId: number;
    siteMediaStatusName: string;
    siteMediaURL: string;
    siteMediaThumbnailURL: string;
    isPoplaPack: boolean;
    createdDateTimeUTC: any;
    userId: number;
    siteMediaStatus: ISiteMediaStatus | null;
    siteMediaCategory: ISiteMediaCategory | null;
    photos: File[];
}

export const newSiteMedia: ISiteMedia = {
    siteMediaId: 0,
    siteId: 0,
    siteMediaCategoryId: 0,
    siteMediaCategoryName: '',
    siteMediaStatusId: 0,
    siteMediaStatusName: '',
    siteMediaURL: '',
    siteMediaThumbnailURL: '',
    isPoplaPack: false,
    createdDateTimeUTC: dateTimeHelper?dateTimeHelper.getCurrentDate():'',// Moment(Moment(), 'YYYY/MM/DD'),
    userId: 0,
    siteMediaStatus: null,
    siteMediaCategory: null,
    photos: []
}