import { ISiteMachineProvider } from '.';
import { ISiteMachineType } from '.';
import { IFormField } from ".";
import * as moment from 'moment';

export interface ISiteMachineEditForm {
    machineId: IFormField<number>;
    identifier: IFormField<string>;
    machineProviderId: IFormField<number>;
    machineProviderName: IFormField<string>;
    machineTypeId: IFormField<number>;
    machineTypeName: IFormField<string>;
    siteId: IFormField<number>;
    modelNumber: IFormField<string>;
    lastPulledDateTimeUTC: IFormField<moment.Moment>;
    isActive: IFormField<boolean>;
    isDeleted: IFormField<boolean>;
    createdDateTimeUTC: IFormField<moment.Moment>;
    userId: IFormField<number>;
    updatedDateTimeUTC: IFormField<moment.Moment>;
    isOwnedByClient: IFormField<boolean>;
    siteMachineProvider: IFormField<ISiteMachineProvider | null>;
    siteMachineType: IFormField<ISiteMachineType | null>;
}

