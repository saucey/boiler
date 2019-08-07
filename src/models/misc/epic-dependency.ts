import { IServiceApi } from './service-api'
import { IEndPointKeys } from './endpoint-keys'

export interface IEpicDependency { 
    api: IServiceApi, 
    endPointKeys: IEndPointKeys
}