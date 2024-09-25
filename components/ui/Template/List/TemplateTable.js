import styles from "./TemplateTable.module.css";
import { useEffect, useState } from "react";
import React from "react";
import DeletePopup from "./deletePopup.js";
import TemplateMenu from "./TemplateMenu.js";
import TableRows from "./TableRows.js";
import PaginationRounded from "./Pagenation.js";
import DeleteStatus from "./deleteStatus.js"

const TemplateTable = React.memo((props) => {

    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [startingItem, setStartingItem] = useState((currentPage - 1) * itemsPerPage);
    const [totalPages, setTotalPages] = useState(Math.ceil(props.templates.length / itemsPerPage));
    const [deleteStatus, setDeleteStatus] = useState(false);

    const [filteredTemplates, setFilteredTemplates] = useState(props.templates);

    const [deleteClick, setDeleteClick] = useState(false);
    const [open, setOpen] = useState(false);
    const [cardView, setCardView] = useState(false);

    const [templateId, setTemplateId] = useState(0);

    return (
        <div className={styles.templates}>
            <div className={`${(deleteClick || deleteStatus) && "opacity-10 pointer-events-none"} `}>
                <div>
                    <TemplateMenu
                        filteredTemplates={filteredTemplates}
                        setFilteredTemplates={setFilteredTemplates} itemsPerPage={setItemsPerPage}
                        setStartingItem={setStartingItem} templates={props.templates} setTotalPages={setTotalPages}
                        roles={props.roles} setPopUp={props.setPopUp} setCardView={setCardView} cardView={cardView}
                    />

                    <div className={styles.templateSection}>
                        <TableRows
                            setCurrentPage={setCurrentPage} filteredTemplates={filteredTemplates}
                            startingItem={startingItem} setStartingItem={setStartingItem}
                            itemsPerPage={itemsPerPage} setTemplateId={setTemplateId}
                            setDeleteClick={setDeleteClick} cardView={cardView} roles={props.roles}
                        />
                    </div>
                    {
                        !cardView && (
                            <div className={styles.pagenation}>
                                <PaginationRounded
                                    setCurrentPage={setCurrentPage} totalPages={Math.ceil(filteredTemplates.length / itemsPerPage)}
                                    itemsPerPage={itemsPerPage} startingItem={startingItem} setStartingItem={setStartingItem}
                                />
                            </div>
                        )
                    }
                </div>
            </div>
            {
                (deleteClick) && (
                    <DeletePopup setDeleteClick={setDeleteClick} setOpen={setOpen} setDeleteStatus={setDeleteStatus} templateId={templateId} />
                )
            }
            {
                (deleteStatus) && (
                    <DeleteStatus setDeleteStatus={setDeleteStatus} />
                )
            }
        </div >
    );
});
export default TemplateTable;