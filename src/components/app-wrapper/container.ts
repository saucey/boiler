import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { push } from 'connected-react-router';
import { IAppState } from '../../store/state';
import { AppWrapper } from './app-wrapper';
import { routes } from '../../routes';
import { setSideMenuVisibility } from '../../store/actions';
import { IAppAction } from '../../store/app-action';

const mapStateToProps = (state: IAppState) => {
    return {
        isReady: state.appContainer.isReady,
        isOpen: state.appContainer.isSideMenuOpen,
        footerHeight: state.dimensionsContainer.footerHeight
    };
};

const mapDispatchToProps = (dispatch: Dispatch<IAppAction>) => {
    return {
        onHomeClick() {
            dispatch(push(routes.home()));
        },
        onToggleSideMenu(open: boolean) {
            dispatch(setSideMenuVisibility(open));
        }
    };
};

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(AppWrapper);