interface IName {
    common: string;
  }
  
  interface IPng {
    png: string;
  }

export interface ICountries {
    name: IName;
    area: number;
    cca3: string;
    capital: string;
    region: string;
    subregion: string;
    flags: IPng;
    population: number;
    languages: string[];
    altSpellings: string[];
    borders: string[]
}