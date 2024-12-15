import { MouseEvent, ReactElement } from "react";
import type { TCatBreedItem } from "../apis/the-cat.ts";
import styles from "../styles/BreedsList.module.css";

interface BreedsListProps {
   list: TCatBreedItem[] ;
   onItemClick: ( id: string ) => ( e: MouseEvent<HTMLButtonElement> ) => void
}

const BreedsList = ( { list, onItemClick }: BreedsListProps ): ReactElement => {
    return (
        <ul className={styles.breedsList}>
            {list.map( ( { name, id } ) => (
                <li key={id}>
                    <button type="button" onClick={onItemClick( id )}>{name}</button>
                </li>
            ) )}
        </ul>
    );
};

export default BreedsList;