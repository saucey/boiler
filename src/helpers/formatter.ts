
export const formatHelper = {
toCurrency(numberString) {
    let number = parseFloat(numberString);
    return '£' + number.toFixed(2);
}
}