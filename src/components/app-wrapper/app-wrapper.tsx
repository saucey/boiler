import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
// import { Header, CompanyLogo, BackgroundImage, CancelLink } from '../../styles/style';
import { getLogo } from '../../helpers/logo';
import { LoadSpinner } from '../load-spinner';
import { Link } from 'react-router-dom'

export interface IAppContainerProps {
  title: string;
  isHome?: boolean;
  isReady: boolean;
  isOpen: boolean;
  footerHeight: number;
  isPurchase: boolean;
  isManagement: boolean;
  isLogOut: boolean;
  onToggleSideMenu(boolean): void;
  render(): JSX.Element;
  renderFooter(): JSX.Element;
  onHomeClick(): void;
}

export interface IAppContainerState {
  isOpen: boolean;
}

//export class AppWrapper extends React.Component<IAppContainerProps, IAppContainerState> {
export const AppWrapper = injectIntl((class extends React.Component<IAppContainerProps & InjectedIntlProps, IAppContainerState> {
  constructor(props: IAppContainerProps & InjectedIntlProps) {
    super(props);
    this.state = { isOpen: this.props.isOpen };
  }

  render() {
    const { title, render, isHome, isPurchase, renderFooter, onHomeClick, isManagement, isLogOut } = this.props;
    const isReady = this.props.isReady;
    return (
      <React.Fragment>
        {isReady ? this.renderApp({ title, isReady, isHome, isPurchase, isManagement, isLogOut,  render, renderFooter, onHomeClick }) : <LoadSpinner />}
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

  renderApp = ({ title, isReady, isHome, isPurchase, isManagement, isLogOut, render, renderFooter, onHomeClick }: {
    title: string,
    isReady: boolean,
    isHome?: boolean,
    isPurchase: boolean,
    isManagement: boolean,
    isLogOut: boolean,
    render(): JSX.Element,
    renderFooter(): JSX.Element,
    onHomeClick(): void
  }) => {
    return [
      (
        <div className='bg-robert-gordon' style={{ paddingBottom: this.props.footerHeight }}>
          <div>
            {/* <button>CANCEL</button> */}
            <div className="cancel-btn-wrapper">
              {
                isManagement && <Link to="/">MANAGEMENT</Link>
              }
              {
                isLogOut && <Link to="/">LOGOUT</Link>
              }
              {
                isPurchase && <Link to="/">CANCEL</Link>
              }
            </div>
            <div className="logo-btn-wrapper"><img className="logo" width="100px" src={getLogo()} /></div>
          </div>
          <div>
            {render()}
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
