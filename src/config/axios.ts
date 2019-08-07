import axios, { AxiosRequestConfig } from 'axios';
import { Observable, from } from 'rxjs';
import appConfig from './app-config';
import { IEndPointKeys, IServiceApi } from '../models';
import { user } from '../helpers/user';

export const endPointKeys: IEndPointKeys = appConfig.endPoints;

const config = (apiEndPoint: string, url: string, data?: any) => {
  const currentUser: any = user();
  let token = ''

  if (currentUser.user) {
    token = currentUser.user['token']
  }
  
  return {
    url: apiEndPoint + '/' + url,
    headers: {
      'Authorization': 'Bearer ' + /*currentUser.token ||*/ token,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    data: data || {}
  };
};

const requestMethods = {

  get(apiEndPoint: string, url: string, data?: any): AxiosRequestConfig {
    return {
      ...config(apiEndPoint, url, data),
      method: 'GET'
    };
  },

  post(apiEndPoint: string, url: string, data?: any): AxiosRequestConfig {
    return {
      ...config(apiEndPoint, url, data),
      method: 'POST'
    };
  },

  put(apiEndPoint: string, url: string, data?: any): AxiosRequestConfig {
    return {
      ...config(apiEndPoint, url, data),
      method: 'PUT'
    };
  }
};

export const api: IServiceApi = {

  get(apiEndPoint: string, url: string, data?: any): Observable<any> {
    return from(axios(requestMethods.get(apiEndPoint, url, data)));
  },

  post(apiEndPoint: string, url: string, data?: any): Observable<any> {
    return from(axios(requestMethods.post(apiEndPoint, url, data)));
  },

  put(apiEndPoint: string, url: string, data?: any): Observable<any> {
    return from(axios(requestMethods.put(apiEndPoint, url, data)));
  },
}

