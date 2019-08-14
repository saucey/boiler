import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
// import { Header, CompanyLogo, BackgroundImage, CancelLink } from '../../styles/style';
import { getLogo } from '../../helpers/logo';
import { LoadSpinner } from '../load-spinner';
import { Link } from 'react-router-dom'
import { IAppUser } from '../../models';

export interface IAppContainerProps {
  user: IAppUser | null;
  title: string;
  isHome?: boolean;
  isReady: boolean;
  isOpen: boolean;
  footerHeight: number;
  isPurchase: boolean;
  onToggleSideMenu(boolean): void;
  render(intl): JSX.Element;
  renderFooter(): JSX.Element;
  onHomeClick(): void;
  logout(): void;
  intl: any;
}

export interface IAppContainerState {
  isOpen: boolean;
  urlLocation: string;
}

//export class AppWrapper extends React.Component<IAppContainerProps, IAppContainerState> {
export const AppWrapper = injectIntl((class extends React.Component<IAppContainerProps & InjectedIntlProps, IAppContainerState> {
  constructor(props: IAppContainerProps & InjectedIntlProps) {
    super(props);
    this.state = {
      isOpen: this.props.isOpen,
      urlLocation: window.location.pathname
    };

  }

  render() {
    const { title, render, isHome, isPurchase, renderFooter, onHomeClick, intl } = this.props;
    const isReady = this.props.isReady;
    return (
      <React.Fragment>
        {isReady ? this.renderApp({ title, isReady, isHome, isPurchase, render, renderFooter, onHomeClick, intl }) : <LoadSpinner />}
      </React.Fragment>
    );
  };

  toggleOpen = () => {
    this.state.isOpen ? this.handleDrawerClose() : this.handleDrawerOpen();
  }

  componentDidMount() {
    // const footer = document.getElementById('footer');
    // console.log(footer, 'footer')
    // this.setState({ height });
  }

  handleDrawerOpen = () => {
    this.setState({ isOpen: true });
    this.props.onToggleSideMenu(true);
  };

  handleDrawerClose = () => {
    this.setState({ isOpen: false });
    this.props.onToggleSideMenu(false);
  };

  setActionLink(url) {
    // User is logged in
    if (this.props.user.userId !== 0) {
      if (url === '/management/permits') {
        return (
          <Link to="/">DASHBOARD</Link>
        )
      } else if (url === '/') {
        return (
          <a href="" onClick={() => this.props.logout()}>LOG OUT</a>
        )
      } else {
        return (
          <Link to="/management/permits">PERMIT LIST</Link>
        )
      }
    } else {
      if (url === '/management/begin-password-reset' || url === '/management/create-password' || url === '/management/reset-password') {
        return (
          <Link to="/">CANCEL</Link>
        )
      }
    }
    return '';
  }

  renderApp = ({ title, isReady, isHome, isPurchase, render, renderFooter, intl, onHomeClick }: {
    title: string,
    isReady: boolean,
    isHome?: boolean,
    isPurchase: boolean,
    intl: any,
    render(intl): JSX.Element,
    renderFooter(): JSX.Element,
    onHomeClick(): void,
  }) => {
    return [
      (
        <div className='bg-robert-gordon' style={{ paddingBottom: this.props.footerHeight }}>
          <div>
            {/* <button>CANCEL</button> */}
            <div className="cancel-btn-wrapper">
              {
                !isPurchase && this.setActionLink(this.state.urlLocation)
              }
              {
                isPurchase && <Link to="/">CANCEL</Link>
              }
            </div>
            <div className="logo-btn-wrapper"><img className="logo" width="100px" src={getLogo()} />
            </div>
          </div>
          <div>
            {render(intl)}
          </div>
          {renderFooter()}
        </div>
      )
    ];
  };
}
)
);

export default AppWrapper;
