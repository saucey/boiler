import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AppContainer from './app-container';
import './index.css';
import { store } from './store';
import { bootstrap } from './bootstrap';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import authentication from 'react-azure-adb2c';
import { Provider } from 'react-redux';

authentication.initialize({
    // optional, will default to this
    instance: 'https://login.microsoftonline.com/tfp/',
    // your B2C tenant
    tenant: 'myb2ctenant.onmicrosoft.com',
    // the policy to use to sign in, can also be a sign up or sign in policy
    signInPolicy: 'mysigninpolicy',
    // the policy to use for password reset
    resetPolicy: 'mypasswordresetpolicy',
    // the the B2C application you want to authenticate with (that's just a random GUID - get yours from the portal)
    applicationId: '75ee2b43-ad2c-4366-9b8f-84b7d19d776e',
    // where MSAL will store state - localStorage or sessionStorage
    cacheLocation: 'sessionStorage',
    // the scopes you want included in the access token
    scopes: ['https://myb2ctenant.onmicrosoft.com/management/admin'],
    // optional, the redirect URI - if not specified MSAL will pick up the location from window.href
    redirectUri: 'http://localhost:3000',
    // optional, the URI to redirect to after logout
    postLogoutRedirectUri: 'http://myapp.com'
});

bootstrap.init(store.dispatch)
    .then(() => {
        ReactDOM.render(
            <Provider store={store}>
                <AppContainer />
            </Provider>
            , document.getElementById('root'))
        //as HTMLElement); //as HTMLElement);
    });
// render()
// // Hot reloading
// if (module['hot']) {
//   // Reload components
//   module['hot'].accept('./App', () => {
//     render()
//   })
//   // Reload reducers
//   module['hot'].accept('./reducers', () => {
//     //store.replaceReducer(rootReducer(history))
//   })
// }
// });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();