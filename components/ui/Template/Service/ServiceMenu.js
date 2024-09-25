import styles from "./ServiceTable.module.css"
import SearchLogo from "../../../icons/SearchLogo";
import PlusLogo from "../../../icons/PlusLogo";
import HorizontalLines from "../../../icons/HorizontalLines";
import { useRouter } from "next/router.js";
import { useState, useEffect } from "react";
import React from "react";
import { BsFillGridFill } from "react-icons/bs";
import { FaBars } from "react-icons/fa";


const ServiceMenu = React.memo(({ filteredServices, setFilteredServices, itemsPerPage, services, setStartingItem, setTotalPages, roles, setPopUp, setCardView, cardView }) => {

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

    const createNewFilteredServices = (searchTerm) => {
        const filteredServices = services?.filter((service) =>
            (service?.id + service?.name + service?.status + service?.version + service?.created_by + service?.date + service?.associated_service).toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
        );

        setFilteredServices(filteredServices);
        setStartingItem(0);
        setTotalPages(Math.ceil(filteredServices.length / itemsPerPage));
    }

    const handleInputChange = (e) => {
        const searchTerm = e.target.value;
        setSearchItem(searchTerm);
        createNewFilteredServices(searchTerm)
    }

    useEffect(() => {
        //reload the page if service chagnes
        createNewFilteredServices(searchItem);
    }, [services])

    return (
        <div className={styles.menu}>
            <h1 className={styles.heading}></h1>
            <div className={styles.menu_options}>
                <div className={styles.search}>
                    <div className={styles.searchIcon}>
                        <SearchLogo />
                    </div>
                    <input className={styles.input} value={searchItem}
                        onChange={(e) => handleInputChange(e)} placeholder="search for services" spellCheck={false}></input>
                </div>
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

export default ServiceMenu;