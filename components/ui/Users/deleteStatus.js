import SuccessIcon from "./../../icons/SuccessIcon"
import { DeleteLogo } from "../../icons";
import styles from "./UserTable.module.css"

function DeleteStatus({ setDeleteStatus }) {
    return (
        <div className={styles.popup} style={{ border: "1px solid green" }}>
            <div className={styles.icon}>
                <div className={styles.delete}>Deleted</div>
                <div className={styles.deleteIcon}>
                    <SuccessIcon width="20" height="20" color="green" />
                </div>
            </div>
            <div className={styles.deleteText}>
                User Deleted Successfully...!
            </div>
            <div className={styles.buttons}>
                <button style={{ backgroundColor: "green", color: "white", fontFamily: "Poppins" }}
                    onClick={() => { setDeleteStatus(false); window.location.reload(); }}>
                    Continue
                </button>
            </div>
        </div>
    );
}

export default DeleteStatus;