import { PropsWithChildren, ReactElement } from "react";
import { Modal as ReactResponsiveModal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import styles from "../styles/Modal.module.css";

interface ModalProps extends PropsWithChildren{
   showDialog?: boolean;
   onDismiss?: () => void;
}

const Modal = ( { children, showDialog = false, onDismiss = () => {} }: ModalProps ): ReactElement => {
    return (
        <ReactResponsiveModal classNames={{
            modal: styles.modal,
            closeButton: styles.closeButton
        }} open={showDialog} onClose={onDismiss} center>
            {children}
        </ReactResponsiveModal>
    );
};

export default Modal;