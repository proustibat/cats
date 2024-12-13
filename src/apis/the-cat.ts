import axios from "axios";

const API_KEY = import.meta.env.VITE_CAT_API_KEY;
const BASE_URL = "https://api.thecatapi.com/v1";

if ( !API_KEY ) {
    throw new Error( "You need an API KEY!" );
}

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["x-api-key"] = API_KEY;
axios.defaults.method = "GET";

export interface ICatBreed {
  weight: {
    imperial: string;
    metric: string;
  };
  id: string;
  name: string;
  temperament: string;
  origin: string;
  country_code: string;
  description:string;
  life_span: string;
  indoor: number;
  lap: number;
  alt_names: string;
  adaptability:number;
  affection_level:number;
  child_friendly: number;
  dog_friendly: number;
  energy_level: number;
  grooming: number;
  health_issues: number;
  intelligence: number;
  shedding_level: number;
  social_needs: number;
  stranger_friendly: number;
  vocalisation: number;
  experimental: number;
  hairless: number;
  natural: number;
  rare: number;
  rex: number;
  suppressed_tail: number;
  short_legs: number;
  wikipedia_url: string;
  hypoallergenic: number;
  reference_image_id: string;
}
export type TCatBreedItem = Pick<ICatBreed, "id" | "name">


interface IImage {
  id: string;
  url: string;
  breeds: ICatBreed[];
  width: number;
  height: number;
}
export type TImageItem = Pick<IImage, "url">;

export const fetchBreeds = async (): Promise<ICatBreed[]> => {
    const response = await axios.get<ICatBreed[]>( `/breeds` );
    return response.data;
};

export const fetchBreed = ( id: string ) => async (): Promise<ICatBreed> => {
    const response = await axios.get<ICatBreed>( `/breeds/${ id }` );
    return response.data;
};

export const fetchImage = ( id: string | null ) => async (): Promise<IImage> => {
    const response = await axios.get<IImage>( `/images/${ id }` );
    return response.data;
};

