import DeleteLogo from "./../../../../components/icons/DeleteLogo"
import SuccessIcon from "./../../../../components/icons/SuccessIcon"
import styles from "./TemplateTable.module.css"

function DeleteStatus({ setDeleteStatus }) {
    return (
        <div className={styles.popup} style={{ border: "1px solid green" }}>
            <div className={styles.popupHeader_for_Success}>
                <div className={styles.delete}>Deleted</div>
            </div>
            <div className={styles.deleteText}>
                Template Deleted Successfully...!
            </div>
            <div className={styles.buttons}>
                <button className={styles.continueButton} onClick={() => { setDeleteStatus(false); window.location.reload(); }}>Continue</button>
            </div>
        </div>
    );
}

export default DeleteStatus;