import { dateTimeHelper } from "./date-time";

export const purchaseCalculator = {
    priceForAllSpaces(price: number, spaces: number, discountPercentage: number): number { return (price * spaces * (1 - discountPercentage) * 100) / 100 },
    priceUntilStartofNextMonth(priceForAllSpaces: number, startDate: Date): number {
        return Math.round(dateTimeHelper.getDaysUsedThisMonth(startDate) / dateTimeHelper.getDaysTotalThisMonth(startDate) * priceForAllSpaces * 100) / 100
    },
    
    getDepositAmount(priceForAllSpaces: number, productFrequencyName: string): number {
        let divideBy = { "Annually": 12, "Semi-Annually": 6, "Quarterly": 3, "Monthly": 1 };
        const divideByFactor: number = divideBy[productFrequencyName];
        return Math.round(priceForAllSpaces / divideByFactor * 100) / 100;
    },

};

