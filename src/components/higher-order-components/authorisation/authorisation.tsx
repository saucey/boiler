
import * as React from 'react';
import { connect } from 'react-redux';
//import { Dispatch } from 'redux';
import { IClient } from '../../../models';
import { IAppState } from '../../../store/state';
import { Redirect } from 'react-router';


const mapStateToProps = (state: IAppState) => {
  return {
    client: state.appContainer.client,
  };
};

export interface IAuthorisationProps {
  client: IClient;

}

export interface IAuthorisationState {
  isPermitted: boolean;
}
//export const AuthorisationHome = withStyles(styles)(class extends React.Component<IAuthorisationProps & WithStyles, IAuthorisationState> {

export const Authorisation = (WrappedComponent, allowedRole?: string) => {
  return connect(mapStateToProps)(class WithAuthorisation extends React.Component<IAuthorisationProps, IAuthorisationState> {

    constructor(props) {
      super(props)
      this.state = { isPermitted: false };
    }

    render() {
      const { client } = this.props;

      return (
        <div>
          {client.clientId !== 307 ? <WrappedComponent {...this.props} /> : <Redirect to="/" />}
        </div>
      )
    }
  })
}

//export default Authorisation;