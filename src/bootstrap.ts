import { Dispatch } from 'redux';
import { initialize } from './store/actions';
import { IAppAction } from './store/app-action';

const API_USER = `${process.env.REACT_APP_API_USERNAME}`;
const PASSWORD = `${process.env.REACT_APP_API_PASSWORD}`;

export const bootstrap = {
    init(dispatch: Dispatch<IAppAction>) {

        return new Promise((resolve, reject) => {
            dispatch(initialize({ userName: API_USER, password: PASSWORD }));
            resolve();
        });
    }
};