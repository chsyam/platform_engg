import { useEffect, useState } from "react"
import { ArrowIcon, DeleteLogo, EditIcon } from "./../../../../icons/"
import styles from "./TemplateTable.module.css"
import EditableLabel from "../../../Configurable/EditableLabel"

function TableRows({ requests,reqName , handleRemoveReq,handleChange,
    startingItem, itemsPerPage, setSelectedId
 }) {
    const handleEditClick = (id) => {
        setSelectedId({id: id, isEdit: true})
    }

    const handleViewClick = (id) => {
        setSelectedId({id: id, isEdit: false});
    }

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <table>
                <thead>
                    <tr>
                        <th>Request ID</th>
                        <th>Request Name</th>
                        <th>Request Replicas</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        requests.sort((a, b) => b.id - a.id).slice(startingItem, startingItem + itemsPerPage).map((request, index) => {
                            return (
                                <tr key={index} onClick={() => { handleViewClick(request.id) }}>
                                    <td>{request.id}</td>
                                    <td>
                                        <EditableLabel
                                            initialValue={request.name}
                                            reqName={reqName}
                                            onValueChange={(newValue) => handleChange(request.id, "name", newValue)} 
                                        />
                                    </td>
                                    <td>
                                        <div className={styles.icon}
                                            onClick={(e)=>{ e.stopPropagation(); handleChange(request.id, "count",request.count-1);}}>
                                            <ArrowIcon direction="right" />
                                        </div>
                                        {request.count}
                                        <div className={styles.icon}
                                            onClick={(e)=>{ e.stopPropagation(); handleChange(request.id, "count",request.count+1);}}>
                                            <ArrowIcon direction="left" />
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles.icon}
                                            onClick={(e) => { e.stopPropagation(); handleEditClick(request.id); }}>
                                            {<EditIcon color="#000137" width="19" height="19" />}
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles.icon}
                                            onClick={(e) => { e.stopPropagation(); handleRemoveReq(request.id); }}>
                                            {<DeleteLogo />}
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    <tr className="h-[30px]"></tr>
                </tbody>
            </table>
        </div>
    );
}

export default TableRows;