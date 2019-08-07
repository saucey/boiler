import { Observable } from 'rxjs'

export interface IServiceApi {
    get(apiKey: string, url: string, data?: any): Observable<any>;
    post(apiKey: string, url: string, data?: any): Observable<any>;
    put(apiKey: string, url: string, data?: any): Observable<any>;
    //view(apiEndPoint: string, url: string): any;
}