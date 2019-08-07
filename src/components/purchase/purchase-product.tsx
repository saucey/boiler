import * as React from 'react'
import { IGeoLocation, IPermitProduct } from '../../models';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faParking } from '@fortawesome/free-solid-svg-icons'
// import { SingleWordGrid, ImageIcon, GridText } from '../../styles/style';

export interface IPurchaseProductProps {
    products: Array<IPermitProduct>;
    selectProduct(product: IPermitProduct): void;
}

export interface IPurchaseProductState {
    isOpenId: number;
    mapCentre: IGeoLocation | null;
};

export class PurchaseProduct extends React.Component<IPurchaseProductProps, IPurchaseProductState> {
    constructor(props: IPurchaseProductProps) {
        super(props);
        this.state = { isOpenId: 0, mapCentre: { latitude: 51.5252224, longitude: -0.15564799999999998 } };
    }

    componentWillMount() {
    };

    onToggleOpen(siteId: number) {
        let newSiteId: number = siteId;
        if (this.state.isOpenId === newSiteId) {
            newSiteId = 0;
        }
        this.setState({ isOpenId: newSiteId });
    }

    selectProduct(product: IPermitProduct) {
        this.props.selectProduct(product);
    }

    productNameDeal(productName) {
        const result = productName.split('-').slice(-1)[0];
        return result;
    }
    
    productNameTitle(productName) {
        const result = productName.split('-').slice(0, -1);
        return result;
    }

    render() {
        const { products } = this.props;
        return (
            <div><br />
                {products.map((item, index) => (
                    // <SingleWordGrid key={index}>
                    // <div key={item.permitProductId} onClick={() => this.props.selectProduct(item)}>
                    //     <img src='/icons/parking.png' />{item.permitProductName.toString()}
                    // </div>
                    <div className="permit-frequency-item" key={item.permitProductId} onClick={() => this.selectProduct(item)}>
                        <FontAwesomeIcon style={{ color: "#ff7914", margin: "0 10px 0 5px", transform: 'rotate(45deg)' }} size="2x" icon={faParking} />
                        <h2 className="frequency-type">{this.productNameDeal(item.permitProductName)}</h2>
                        <span className="frequency-text" key={3}>{this.productNameTitle(item.permitProductName)}</span>
                    </div>
                    // </SingleWordGrid>
               )
                )}
            </div>
        )
    }
}


