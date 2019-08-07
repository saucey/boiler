import * as React from 'react'
import { BrowserRouter as Route, Redirect} from 'react-router-dom'
import { user } from '../helpers/user';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      user().isAuthenticated === true ? <Component {...props} /> 
      : <Redirect to={{ pathname: '/login', state: { from: props.location }}} />
    )} />
  )