import { ReactElement } from "react";
import styles from "../styles/Loader.module.css";

const Loader = (): ReactElement => {
    return <div className={styles.pulse} />;
};

export default Loader;