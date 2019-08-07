import { History } from 'history';
import createBrowserHistory from 'history/createBrowserHistory';

const history: History = createBrowserHistory();

export const appHistory = (): History => { 
    return history;
};