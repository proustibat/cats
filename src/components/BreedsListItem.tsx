import { MouseEvent, PropsWithChildren, ReactElement } from "react";
import styles from "../styles/BreedsList.module.css";
import useRate from "../hooks/useRate.tsx";

interface BreedsListItemProps extends PropsWithChildren{
    onClick: ( e: MouseEvent<HTMLButtonElement> ) => void;
    imageId?: string;
}

const BreedsListItem = ( { imageId, onClick, children }: BreedsListItemProps ): ReactElement => {
    const { rate } = useRate( imageId );

    return (
        <li>
            <button className={styles.button} type="button" onClick={onClick}>
                {children}
                {( rate && rate !== 0 ) ? ` (${ rate })` : null}
            </button>
        </li>
    );
};

export default BreedsListItem;