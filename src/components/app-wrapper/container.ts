import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { push } from 'connected-react-router';
import { IAppState } from '../../store/state';
import { AppWrapper } from './app-wrapper';
import { routes } from '../../routes';
import { setSideMenuVisibility, logOut, setLanguageLocale } from '../../store/actions';
import { IAppAction } from '../../store/app-action';
import { newUser } from '../../models';


const mapStateToProps = (state: IAppState) => {
    return {
        user: state.appContainer.user ? state.appContainer.user : newUser,
        isReady: state.appContainer.isReady,
        isOpen: state.appContainer.isSideMenuOpen,
        footerHeight: state.dimensionsContainer.footerHeight,
        client: state.appContainer.client,

    };
};

const mapDispatchToProps = (dispatch: Dispatch<IAppAction>) => {
    return {
        onHomeClick() {
            dispatch(push(routes.home()));
        },
        onToggleSideMenu(open: boolean) {
            dispatch(setSideMenuVisibility(open));
        },
        logout() {
            dispatch(logOut());
        },
        setLanguage(lang: string){
            dispatch(setLanguageLocale(lang));
        }
    };
};

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(AppWrapper);