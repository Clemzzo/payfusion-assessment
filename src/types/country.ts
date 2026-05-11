export type FlagImage = {
  png?: string;
  svg?: string;
  alt?: string;
};

export type Country = {
  countryId?: string;
  countryName: string;
  countryCode: string;
  currency: string;
  currencyCode: string;
  currencyIcon?: string;
  flag?: string;
  flagURL?: FlagImage | string;
  internetCountryCode: string;
};

export type CountriesResponse = {
  statusCode: number;
  data: Country[];
};
