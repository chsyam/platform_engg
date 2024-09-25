import { DeleteLogo } from "../../../icons";
import styles from "./ServiceTable.module.css";
import deleteById from "../../../../pages/api/templates/delete";

function DeletePopup({ setDeleteClick, setOpen, templateId }) {

    const deleteHandler = (templateId) => {
        return deleteById(templateId);
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
                Do you want to delete the template?
            </div>
            <div className={styles.buttons}>
                <button onClick={() => { setDeleteClick(false); }}>Cancel</button>
                <button onClick={() => { setOpen(true); setDeleteClick(false); deleteHandler(templateId); }}>Delete</button>
            </div>
        </div>
    );
}

export default DeletePopup;