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
            <img
                className={styles.icon}
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABBUlEQVR4nO3ZTQqDMBAF4HeKPOkV2+MWbE9jKXUhRcQk8xeZt3Il8xFNZgiQyWQyV8odwORdBH41fGtpygPAAmB2xkxrDctaU3UKgOf6gjeAG+zDTQ2vnho8MZRCeGIojfDAUAthiaE2wgJjhtDEmCM0MG4ISYw7QgITBtGDCYdowYRF1GDCI85ghkEcYYZD7M0Q899zhEGteWWGW4lttp+T53DWlUt8Wtz5sSOMzVU52p2GwfDEFhsew4pzIiyGDYddOAw7TuwwGAq0He4YCvZObhgqNIDmGCp2sWYYi1a8aGMs54mihfEYioo0xnOyK1KYCONpkcBc5urtMpehmUwmg3D5AAklyc9YEtl/AAAAAElFTkSuQmCC"
                alt="close"
            />
        </button>
    );
};

export default CloseButton;