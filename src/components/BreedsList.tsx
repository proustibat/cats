import { MouseEvent, ReactElement } from "react";
import type { TCatBreedItem } from "../apis/the-cat.ts";
import styles from "../styles/BreedsList.module.css";
import BreedsListItem from "./BreedsListItem.tsx";

interface BreedsListProps {
   list?: TCatBreedItem[];
   onItemClick: ( id: string ) => ( e: MouseEvent<HTMLButtonElement> ) => void
}

const BreedsList = ( { list, onItemClick }: BreedsListProps ): ReactElement => {
    return (
        <>
            {!list?.length
                ? <p className={styles.noResult}>No result</p>
                : (
                    <ul className={styles.breedsList}>
                        {list?.map( ( { name, id, reference_image_id } ) => (
                            <BreedsListItem key={id} onClick={onItemClick( id )} imageId={reference_image_id} >{name}</BreedsListItem>
                        ) )}
                    </ul>
                )
            }
        </>
    );
};

export default BreedsList;