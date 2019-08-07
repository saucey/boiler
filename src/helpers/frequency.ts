import { IProductPrices, IProductFrequency } from "../models";
import { IAppState } from "../store/state";
import { store } from "../store";

export const createProductFrequenciesFromProductPrices = (prices: IProductPrices):Array<IProductFrequency> => {
    let frequenciesWithoutPrices = getFrequencies();

    if(!prices) return [];
    let frequenciesWithPrices: Array<IProductFrequency> = [];

    if(frequenciesWithoutPrices) {
    frequenciesWithoutPrices.forEach((value) => {
        let priceF: number = 0;
        if(value.productFrequencyName === 'Annually')    {priceF = prices.priceAnnually;}
        if(value.productFrequencyName === 'Semi-Annually'){priceF = prices.priceSemiAnnually;}
        if(value.productFrequencyName === 'Quarterly')   {priceF = prices.priceQuarterly;}
        if(value.productFrequencyName === 'Monthly')     {priceF = prices.priceMonthly;}
        if(value.productFrequencyName === 'Weekly')      {priceF = prices.priceWeekly;}

        let singleFrequencyWithPrice: IProductFrequency = value;

        singleFrequencyWithPrice.price = priceF;

        if(singleFrequencyWithPrice.price > 0)
        {
            frequenciesWithPrices.push(singleFrequencyWithPrice);
        }
    })
}
return frequenciesWithPrices;
}

export const getFrequencies = (): Array<IProductFrequency> => {
        let state: IAppState = store.getState() as IAppState;
        return state.referenceData.productFrequencies ? state.referenceData.productFrequencies: 
            [{productFrequencyId:1, productFrequencyName: 'Annually', productFrequencyPeriodName:'year', productFrequencyDescription:'', timeOrder:1,price:0}];
};
