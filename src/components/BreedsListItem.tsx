import { MouseEvent, PropsWithChildren, ReactElement } from "react";
import styles from "../styles/BreedsList.module.css";
import useRate from "../hooks/useRate.tsx";

interface BreedsListItemProps extends PropsWithChildren{
    onClick: ( e: MouseEvent<HTMLButtonElement> ) => void;
    imageId?: string;
}

const BreedsListItem = ( { imageId, onClick, children }: BreedsListItemProps ): ReactElement => {
    const note = useRate( imageId );

    return (
        <li>
            <button className={styles.button} type="button" onClick={onClick}>
                {children}
                {( note && note !== 0 ) ? ` (${ note })` : null}
            </button>
        </li>
    );
};

export default BreedsListItem;