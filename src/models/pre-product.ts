import Moment from 'moment';

export interface IPreProduct
{
    permitProductId: number;
    vrms : Array<string>;
    startDate : any;
    spaces : number;
    isPreProduct: boolean;
}

export class PreProduct implements IPreProduct
{
    permitProductId: number;
    vrms : Array<string>;
    startDate : any;
    spaces : number;
    isPreProduct: boolean;
    
        constructor(){
        this.vrms = [];
        this.startDate = Moment().format('YYYY/MM/DD');
        this.spaces = 0;
        this.permitProductId = 0;
        this.isPreProduct = false;

    }
}
