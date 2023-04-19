export enum Currency {
  EUR = 'eur',
  USD = 'usd',
}

export const getCurrencySymbol = (currency: Currency) => {
  switch (currency) {
    case Currency.EUR:
      return '€';
    case Currency.USD:
      return '$';
    default:
      return '';
  }
};
