import styles from "./ServiceTable.module.css";
import { useEffect, useState } from "react";
import React from "react";
import DeletePopup from "./deletePopup.js";
import ServiceMenu from "./ServiceMenu.js";
import TableRows from "./TableRows.js";
import PaginationRounded from "./Pagenation.js";
import ViewItem from "./ViewItem.js";

const ServiceTable = React.memo((props) => {

    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(Math.ceil(props.services.length / itemsPerPage));
    const [filteredServices, setFilteredServices] = useState(props.services);
    const [deleteClick, setDeleteClick] = useState(false);
    const [open, setOpen] = useState(false);
    const [templateId, setTemplateId] = useState(0);
    const [viewPopUp, setViewPopUp] = useState(false);
    const [popUpData, setPopUpData] = useState({ status: "success", msg: "some msg", data: {} });
    const [startingItem, setStartingItem] = useState(0); // Declare startingItem state

    const [cardView, setCardView] = useState(false);
    // Calculate startingItem whenever currentPage changes
    useEffect(() => {
        setStartingItem((currentPage - 1) * itemsPerPage);
    }, [currentPage, itemsPerPage]);

    useEffect(() => {

        console.log("reloading the page w.r.t. view popup")
    }, [viewPopUp])


    return (
        <div className={styles.services}>
            {
                viewPopUp && <ViewItem setViewPopUp={setViewPopUp} popUpData={popUpData} />
            }
            <div className={`${(deleteClick || viewPopUp) && "opacity-10 pointer-events-none"} `}>
                <div>
                    <ServiceMenu
                        filteredServices={filteredServices}
                        setFilteredServices={setFilteredServices} itemsPerPage={setItemsPerPage}
                        setStartingItem={setStartingItem} services={props.services} setTotalPages={setTotalPages}
                        roles={props.roles} setPopUp={props.setPopUp} setCardView={setCardView} cardView={cardView}
                    />

                    <TableRows
                        filteredServices={filteredServices} setFilteredServices={setFilteredServices}
                        startingItem={startingItem} setViewPopUp={setViewPopUp}
                        setPopUpData={setPopUpData} itemsPerPage={itemsPerPage} setTemplateId={setTemplateId}
                        setCardView={setCardView} cardView={cardView} roles={props.roles}
                    />

                    <div className={styles.pagenation}>
                        <PaginationRounded
                            setCurrentPage={setCurrentPage} totalPages={Math.ceil(filteredServices.length / itemsPerPage)}
                            itemsPerPage={itemsPerPage} setStartingItem={setStartingItem}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
});

export default ServiceTable;