import styles from "./TemplateTable.module.css";
import axios from "axios";

function DeletePopup({ setDeleteClick, setOpen, templateId, setDeleteStatus }) {

    const deleteHandler = async (templateId) => {
        try {
            await axios.post('/api/templates/delete', { "id": templateId });
        } catch (error) {
            console.error(error.response);
        }
    }

    return (
        <div className={styles.popup}>
            <div className={styles.popupHeader}>
                <div className={styles.delete}>Delete</div>
            </div>
            <div className={styles.deleteText}>
                Do you want to delete this template?
            </div>
            <div className={styles.buttons}>
                <button className={styles.cancelButton} onClick={() => { setDeleteClick(false); }}>Cancel</button>
                <button className={styles.deleteButton} onClick={() => { setOpen(true); setDeleteClick(false); deleteHandler(templateId); setDeleteStatus(true); }}>Delete</button>
            </div>
        </div>
    );
}

export default DeletePopup;