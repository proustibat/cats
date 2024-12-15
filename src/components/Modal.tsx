import { PropsWithChildren, ReactElement } from "react";
import { DialogContent, DialogOverlay } from "@reach/dialog";
import styles from "../styles/Modal.module.css";

interface ModalProps extends PropsWithChildren{
   showDialog?: boolean;
   onDismiss?: () => void;
}

const Modal = ( { children, showDialog = false, onDismiss = () => {} }: ModalProps ): ReactElement => {
    return (
        <DialogOverlay
            className={styles.dialogOverlay}
            isOpen={ showDialog }
            onDismiss={onDismiss}
        >
            <DialogContent className={styles.dialogContent}>
                {children}
            </DialogContent>
        </DialogOverlay>
    );
};

export default Modal;