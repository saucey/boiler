import { ICustomer } from "../customer";

export interface IUser { 
    userId: number; 
    userName: string; 
    displayName: string; 
    userType: string;
}

export interface IAppUser extends IUser { 
    emailAddress: string; 
    isAuthenticated: boolean;
    token: string;
    claims: Array<any>;
    isActive: boolean;
    customer: ICustomer | null;
}

export const newUser:IAppUser = {
    userId: 0,
    userName: '',
    displayName: '',
    userType: '',
    emailAddress: '',
    isAuthenticated: false,
    token: '',
    claims:[],
    isActive: true,
    customer: null
}