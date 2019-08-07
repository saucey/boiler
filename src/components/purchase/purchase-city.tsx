import * as React from 'react'
import { ITown } from '../../models';
// import { RouteComponentProps } from 'react-router';
// import { SingleWordGrid, City, CityGrid, VerticalSpacer5 } from '../../styles/style';

export interface IPurchaseCityProps {
    towns: Array<ITown>;
    selectTown(town: ITown): void;
    resetTown(): void;
}

export interface IPurchaseCityState { };

export class PurchaseCity extends React.Component<IPurchaseCityProps/*, RouteComponentProps*/> {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.resetTown()
    }

    render() {
        return (
            <React.Fragment>
                {/* {window.innerWidth > 550 && <VerticalSpacer5/>} */}
                <ul className="city-list">
                    {this.props.towns.map(item => (
                        <li key={item.town} onClick={() => this.props.selectTown(item)}>
                            <span key={item.town}>{item.town.toString()}</span>
                        </li>
                    )
                    )}
                </ul>
            </React.Fragment>
        )
    }
}
