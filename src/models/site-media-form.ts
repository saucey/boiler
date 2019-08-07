import { ISiteMediaCategory, ISiteMediaStatus } from '.';
import { IFormField } from ".";
import * as moment from 'moment';

export interface ISiteMediaEditForm {

    siteMediaId:IFormField<number>;  
    siteId: IFormField<number>;  
    siteMediaCategoryId: IFormField<number>;  
    siteMediaCategoryName: IFormField<string>;  
    siteMediaStatusId: IFormField<number>;  
    siteMediaStatusName: IFormField<string>; 
    siteMediaURL: IFormField<string>;  
    siteMediaThumbnailURL: IFormField<string>;  
    isPoplaPack: IFormField<boolean>;  
    createdDateTimeUTC: IFormField<moment.Moment>;
    userId: IFormField<number>;  
    siteMediaStatus: IFormField<ISiteMediaStatus | null>;
    siteMediaCategory: IFormField<ISiteMediaCategory | null>;
    photos: IFormField<File[]>;
}