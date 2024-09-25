import { DeleteLogo } from "./../../icons/DeleteLogo";
import styles from "./UserTable.module.css";
import axios from "axios";

function DeletePopup(props) {

    const user = props.users.filter((item) => item.id === props.userId);
    const username = user.map((item) => item.username);

    const handleDelete = async () => {
        props.setDeleteClick(false);
        props.setOpen(true);
        try {
            await axios.delete(`/api/user_management/users/delete/${username}`);
        } catch (error) {
            console.error(error.response);
        }
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
                {`Do you want to delete the User with username ${username}?`}
            </div>
            <div className={styles.buttons}>
                <button onClick={() => { props.setDeleteClick(false); }}>Cancel</button>
                <button
                    onClick={() => { props.setDeleteStatus(true); handleDelete(); }}
                >Delete</button>
            </div>
        </div>
    );
}

export default DeletePopup;