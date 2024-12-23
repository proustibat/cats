import { ReactElement } from "react";
import styles from "../styles/CloseButton.module.css";

interface CloseButtonProps {
   onClose: () => void;
}

const CloseButton = ( { onClose }: CloseButtonProps ): ReactElement => {
    return (
        <button
            className={styles.closeButton}
            onClick={onClose}
        >
            ✕
        </button>
    );
};

export default CloseButton;