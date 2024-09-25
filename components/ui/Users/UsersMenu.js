import styles from "./UserTable.module.css"
import SearchLogo from "./../../icons/SearchLogo"
import { useRouter } from "next/router.js";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";

function UsersMenu(props) {

    const router = useRouter();
    const [searchItem, setSearchItem] = useState('')

    const handleOnClick = () => {
        router.push(`${router.asPath}/create`);
    };

    const handleInputChange = (e) => {
        const searchTerm = e.target.value;
        setSearchItem(searchTerm);

        const filteredUsers = props.users.filter((user) =>
            (user.username + user.email).toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
        );

        props.setFilteredUsers(filteredUsers);
        props.setStartingItem(0);
        props.setTotalPages(Math.ceil(filteredUsers?.length / props.itemsPerPage));
    }

    const multipleDelete = () => {
        return Object.values(props.checkedObject).filter(value => value === true).length > 0;
    }

    return (
        <div className={styles.menu}>
            <h1 className={styles.heading}></h1>
            <div className={styles.menu_options}>
                <div className={styles.search}>
                    <div className={styles.searchIcon}>
                        <SearchLogo />
                    </div>
                    <input className={styles.input} value={searchItem}
                        onChange={(e) => handleInputChange(e)} placeholder="search for Users" spellCheck={false}>
                    </input>
                </div>
                <div className="mx-[10px]">
                    <button type="button" className={styles.createNew} onClick={() => { handleOnClick() }}>
                        <span style={{ fontSize: "20px", padding: "4px" }}>
                            <FaPlus />
                        </span>
                        <span className="pt-[2px]">Create New User</span>
                    </button>
                </div>
                {/* <div className="mx-[10px]">
                    <button type="button" className={styles.createNew} onClick={() => { handleOnClick() }}>
                        <span className="pt-[2px]">Create New Group</span>
                    </button>
                </div> */}
                {/* <div className={styles.deleteLogo}
                    style={multipleDelete() ? { "cursor": "pointer" } : { "opacity": 0.5, "cursor": "not-allowed", "pointerEvents": "none" }}
                >
                    <DeleteLogo height="25" width="30" />
                </div> */}
            </div>
        </div>
    );
}

export default UsersMenu;