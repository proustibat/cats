import axios from "axios";

export const API_TYPE = import.meta.env.VITE_API_TYPE;
const API_KEY = import.meta.env.VITE_CAT_API_KEY;
const BASE_URL = API_TYPE === "dogs"
    ? "https://api.thedogapi.com/v1"
    : "https://api.thecatapi.com/v1";


if ( !API_KEY ) {
    throw new Error( "You need an API KEY!" );
}

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["x-api-key"] = API_KEY;

export enum QUERY_KEY {
    BREEDS = "breeds",
    SEARCH = "search",
    BREED = "breed",
    IMAGE = "image",
    VOTES = "votes",
    RATE = "rate",
}

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
export type TCatBreedItem = Pick<ICatBreed, "id" | "name" | "reference_image_id">

export interface IVote {
  country_code: string;
  created_at: string
  id: number
  image_id: string
  sub_id: string
  value: number
}

interface IImage {
  id: string;
  url: string;
  breeds: ICatBreed[];
  width: number;
  height: number;
}
export type TImageItem = Pick<IImage, "url">;

export const fetchBreeds = async (): Promise<ICatBreed[]> => {
    const breeds = await axios.get<ICatBreed[]>( `/breeds` );
    return breeds.data;
};

export const fetchVotes = async (): Promise<IVote[]> => {
    const votes = await axios.get<IVote[]>( `/votes` );
    console.log( votes.data );
    return votes.data;
};

export const fetchBreed = ( id: string ) => async (): Promise<ICatBreed> => {
    const response = await axios.get<ICatBreed>( `/breeds/${ id }` );
    return response.data;
};

export const fetchImage = ( id: string | null ) => async (): Promise<IImage> => {
    const response = await axios.get<IImage>( `/images/${ id }` );
    return response.data;
};

export const search = ( searchTerm: string ) => async (): Promise<ICatBreed[]> => {
    const response = await axios.get<ICatBreed[]>( `/breeds/search?q=${ searchTerm }&attach_image=1` );
    return response.data;
};

export enum ACTION_VOTE {
    UP = "up",
    DOWN = "down"
}

export const postVote = ( { imageId, action }: {imageId: string, action: ACTION_VOTE } ) => {
    console.log( "POSTVOTE ", imageId, action );
    return axios.post( '/votes', {
        image_id: imageId,
        sub_id: crypto.randomUUID(), // todo: using a user to prevent multi votes
        value: action === ACTION_VOTE.UP ? 1 : -1,
    } );
};
