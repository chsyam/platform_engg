import MultiActionAreaCard from "./MultiActionAreaCard";
import { DeleteLogo, EditIcon, UploadLogo } from "./../../../icons"
import styles from "./TemplateTable.module.css"
import { useRouter } from "next/router.js"
import { useEffect, useState } from "react";

function TableRows(
    { filteredTemplates, startingItem, setStartingItem,
        itemsPerPage, setTemplateId, setDeleteClick, cardView, roles
    }) {

    const [isDeveloper, setIsDeveloper] = useState(false);
    useEffect(() => {
        if (!(roles?.includes("developer") && !roles?.includes("project-admin") && !roles?.includes("platform-admin"))) {
            setIsDeveloper(true)
        }
    })

    const router = useRouter();

    const onIdClick = (id, templateName) => {
        router.push({
            pathname: `${router.asPath}/${id}`,
            query: {
                templateName: templateName,
            }
        });
    }

    const handleEditClick = (id, templateName) => {
        router.push({
            pathname: `${router.asPath}/${id}`,
            query: {
                templateName: templateName,
                edit: true,
            }
        });
    }

    const handleDeployClick = (id, templateName) => {
        router.push({
            pathname: `${router.asPath}/${id}`,
            query: {
                templateName: templateName,
                deploy: true,
            }
        });
    }

    const formatDate = (dateString) => {
        const inputDateStr = dateString;
        const [year, month, day] = inputDateStr.split('-');
        const date = new Date(year, month - 1, day);
        const formattedDateStr = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
        return formattedDateStr;
    }

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            {
                cardView ?
                    filteredTemplates.length === 0 ?
                        "No records found try clearing filters"
                        :
                        <div className={styles.card_section}>
                            {
                                filteredTemplates.sort((a, b) => b.id - a.id).map((template, index) => {
                                    return (
                                        <div key={index}>
                                            <MultiActionAreaCard
                                                key={index}
                                                id={template.id}
                                                title={template.name}
                                                createdBy={template.created_by}
                                                createdOn={template.date}
                                                type={template.associated_service}
                                                setTemplateId={setTemplateId}
                                                setDeleteClick={setDeleteClick}
                                                isDeveloper={isDeveloper}
                                            />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    :
                    <table>
                        <thead>
                            <tr>
                                <th>Template ID</th>
                                <th>Template Name</th>
                                <th>Version</th>
                                <th>Created By</th>
                                <th>Date</th>
                                <th>Type</th>
                                {
                                    isDeveloper &&
                                    (
                                        <th>Edit</th>
                                    )
                                }
                                <th>Deploy</th>
                                {
                                    isDeveloper &&
                                    (
                                        <th>Delete</th>
                                    )
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTemplates.length === 0 ?
                                <tr>
                                    <td colSpan="9">No records found. Try clearing filters</td>
                                </tr> :
                                filteredTemplates.sort((a, b) => b.id - a.id).slice(startingItem, startingItem + itemsPerPage).map((template, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className={styles.id} onClick={
                                                () => { onIdClick(template.id, template.name) }
                                            }>{template.id}</td>
                                            <td onClick={
                                                () => { onIdClick(template.id, template.name) }
                                            }>{template.name}</td>
                                            <td>{template.version}</td>
                                            <td>{template.created_by}</td>
                                            <td>{formatDate(template.date)}</td>
                                            <td>{template.associated_service}</td>
                                            {
                                                isDeveloper &&
                                                (
                                                    <td>
                                                        <div className={styles.icon} onClick={
                                                            () => { handleEditClick(template.id, template.name) }
                                                        }>
                                                            {<EditIcon color="#000137" width="19" height="19" />}
                                                        </div>
                                                    </td>
                                                )
                                            }

                                            <td>
                                                <div className={styles.icon} onClick={
                                                    () => { handleDeployClick(template.id, template.name) }
                                                }>
                                                    <UploadLogo />
                                                </div>
                                            </td>
                                            {
                                                isDeveloper &&
                                                (
                                                    <td>
                                                        <div className={styles.icon}
                                                            onClick={() => { setTemplateId(template.id); setDeleteClick(true) }}
                                                        >
                                                            {<DeleteLogo />}
                                                        </div>
                                                    </td>
                                                )
                                            }
                                        </tr>
                                    )
                                })
                            }
                            <tr className="h-[30px]"></tr>
                        </tbody>
                    </table>
            }
        </div>
    );
}

export default TableRows;