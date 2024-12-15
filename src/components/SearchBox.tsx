import { ReactElement, ChangeEvent } from "react";
import styles from "../styles/SearchBox.module.css";


interface SearchBoxProps {
    searchTerm: string;
    onChange: ( e:ChangeEvent<HTMLInputElement> ) => void
}

const SearchBox = ( { searchTerm, onChange }: SearchBoxProps ): ReactElement => {
    return (
        <div className={styles.container}>
            <input
                value={searchTerm}
                className={styles.input}
                name="search" id="search"
                placeholder="Search for a breed"
                type="search"
                onChange={onChange}
            />
        </div>

    );
};

export default SearchBox;