import styles from "./TemplateTable.module.css"
import SearchLogo from "../../../icons/SearchLogo";
import { useRouter } from "next/router.js";
import { useState, useEffect } from "react";
import React from "react";
import { BsFillGridFill } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

const TemplateMenu = React.memo(({ filteredTemplates, setFilteredTemplates, itemsPerPage, templates, setStartingItem, setTotalPages, roles, setPopUp, setCardView, cardView }) => {
    const router = useRouter();
    const [searchItem, setSearchItem] = useState('')

    const handleOnClick = () => {
        const isAdmin = roles?.includes("project-admin") || roles?.includes("platform-admin");
        if (isAdmin) {

            router.push(`${router.asPath}/create`);
        }
        else {
            console.log("it is ", roles)
            setPopUp({ type: -1, msg: "Only Project Admins are allowed" })
        }
    }

    const createNewFilteredTemplates = (searchTerm) => {
        const filteredTemplates = templates.filter((template) =>
            (template.id + template.name + template.version + template.created_by + template.date + template.associated_service).toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
        );

        setFilteredTemplates(filteredTemplates);
        setStartingItem(0);
        setTotalPages(Math.ceil(filteredTemplates.length / itemsPerPage));
    }

    const handleInputChange = (e) => {
        const searchTerm = e.target.value;
        setSearchItem(searchTerm);
        createNewFilteredTemplates(searchTerm)
    }

    useEffect(() => {
        createNewFilteredTemplates(searchItem);
    }, [templates])

    return (
        <div className={styles.menu}>
            <h1 className={styles.heading}></h1>
            <div className={styles.menu_options}>
                <div className={styles.search}>
                    <div className={styles.searchIcon}>
                        <SearchLogo />
                    </div>
                    <input className={styles.input} value={searchItem}
                        onChange={(e) => handleInputChange(e)} placeholder="search for templates" spellCheck={false}></input>
                </div>
                {
                    (roles?.includes("platform-admin") || roles?.includes("project-admin")) && (
                        <div className="mx-[10px]">
                            <button type="button" className={styles.createNew} onClick={() => { handleOnClick() }}>
                                <span style={{ fontSize: "20px", padding: "4px" }}>
                                    <FaPlus />
                                </span>
                                <span className="pt-[2px]">Create Template</span>
                            </button>
                        </div>
                    )
                }
                <div className={styles.horizontalLines} onClick={() => setCardView(!cardView)}>
                    {
                        cardView ?
                            <span style={{ fontSize: "30px" }}>
                                <FaBars />
                            </span>
                            :
                            <span style={{ fontSize: "30px" }}>
                                <BsFillGridFill />
                            </span>
                    }
                </div>
            </div>
        </div>
    );
});

export default TemplateMenu;