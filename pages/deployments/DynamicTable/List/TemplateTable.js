import styles from "./TemplateTable.module.css";
import { useState, useCallback } from "react";
import React from "react";
import TableRows from "./TableRows.js";
import PaginationRounded from "./Pagenation.js";


const TemplateTable = React.memo(({ requests, status, selectedId, setSelectedId, setResponseId }) => {

    const [itemsPerPage, _] = useState(4);
    const [currentPage, setCurrentPage] = useState(1);
    const [startingItem, setStartingItem] = useState((currentPage - 1) * itemsPerPage);


    return (
        <div className={styles.templates}>
            <div className={styles.templateSection}>
                <TableRows
                    requests={requests}
                    startingItem={startingItem}
                    itemsPerPage={itemsPerPage}
                    setSelectedId={setSelectedId}
                    setResponseId={setResponseId}
                />
            </div>
            <div className={styles.pagenation}>
                <PaginationRounded
                    selectedId={selectedId}
                    setCurrentPage={setCurrentPage} totalPages={Math.ceil(requests?.length / itemsPerPage)}
                    itemsPerPage={itemsPerPage} startingItem={startingItem} setStartingItem={setStartingItem}
                />
            </div>
        </div>
    );
});
export default TemplateTable;