export interface IPayment
{
    id: string;
    tokenId : number | null;
    sourceId: number | null;
    description: string;
    amount : number;
    currency: string;
    userId: number;
    customerId: number 
}

export class Payment implements IPayment
{
    id: string;
    tokenId : number | null;
    sourceId: number | null;
    description: string;
    amount : number;
    currency: string;
    userId: number;
    customerId: number

    constructor(){
        this.id = null,
        this.tokenId = null,
        this.sourceId = null,
        this.description = '',
        this.amount = 0,
        this.currency = 'gbp',
        this.userId = 0,
        this.customerId = 0
    }
}