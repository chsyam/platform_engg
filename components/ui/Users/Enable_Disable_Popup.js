import { DeleteLogo } from "../../icons/DeleteLogo";
import styles from "./UserTable.module.css";

function EnableDisablePopup(props) {

    const handleCancel = () => {
        props.setEnableOrDisable([false, props.enableOrDisable[1]]);
    }

    const handleToggle = () => {
        props.setOpen(true);
        props.setEnableOrDisable([false, props.enableOrDisable[1]]);
    }

    return (
        <div className={styles.popup}>
            <div className={styles.icon}>
                <div className={styles.delete}>Delete</div>
                <div className={styles.deleteIcon}>
                    <DeleteLogo width="20" height="20" color="red" />
                </div>
            </div>
            <div className={styles.deleteText}>
                <span>Do you want to {props.enableOrDisable[1] === true ? "disable" : "enable"} the User?</span>
            </div>
            <div className={styles.buttons}>
                <button onClick={() => handleCancel()}>
                    Cancel
                </button>
                <button onClick={() => handleToggle()}>
                    {props.enableOrDisable[1] === true ? "Disable" : "Enable"}
                </button>
            </div>
        </div>
    );
}

export default EnableDisablePopup;