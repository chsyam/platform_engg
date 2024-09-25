import { ActionLogo } from "../../../icons";
import styles from "./ServiceTable.module.css"
import { useRouter } from "next/router.js"
import { useEffect, useState } from "react"
import ActionItem from "./actionItem";
import axios from "axios";

function TableRows(
    { filteredServices,setFilteredServices, startingItem, setStartingItem,
        setViewPopUp, setPopUpData,
        itemsPerPage, setTemplateId, setDeleteClick,
        roles
    }) {

    const router = useRouter();

    const onIdClick = (id, serviceName) => {
        router.push({
            pathname: `${router.asPath}/${id}`,
            query: {
                id: id,
                serviceName: serviceName,
            }
        });
    }

    const handleApproved = async (id) => {
        try {
            await axios.post('/api/deployments/approve', { "id": id, status: 'Approved' });
        } catch (error) {
            console.log(error);
            //   setRes({type: -1, msg: error.message});
        }
    }

    const handleProvision = async (id) => {
        try {
            console.log("request to provision")
            await axios.post('/api/deployments/provision', { "id": id });
        } catch (error) {
            console.log(error)
            // setRes({type: -1, msg: error.message});
        }
    }

    const handleClone = async (id) => {
        try {
            console.log("request to provision")
            await axios.post('/api/deployments/clone', { "id": id });
        } catch (error) {
            console.log(error)
            // setRes({type: -1, msg: error.message});
        }
    }
    const handleDelete = async (id) => {
        try {
            console.log("request to delete");
            await axios.post('/api/deployments/delete', { "id": id });
        }
        catch (error) {
            console.log(error)
        }
    }
    const handleView = async (id) => {
        try {
            console.log("request to view")
            const response = await axios.post('/api/deployments/view', { "id": id });
            const details = response.data.message[0];
            setViewPopUp(true);
            console.log("deails is ", details)
            setPopUpData({ status: details.status, msg: details.message, data: details.data });
        } catch (error) {
            console.log(error)
            // setRes({type: -1, msg: error.message});
        }
    }
    const triggerAction = (action, id) => {
        if (action === "Approve") {
            handleApproved(id);
        }
        else if (action === "Provision") {
            handleProvision(id);
        }
        else if (action === "Delete") {
            handleDelete(id);
        }
        else if (action === "Clone") {
            handleClone(id);
        }
        else if (action == "View") {
            handleView(id);
        }
        else {
            //implement for all other actions
        }
    }
    // const [action, setAction] = useState(false);

    const setVisibility = (id,value) => {
        const updatedList = filteredServices.map(item => {
            if(item.id === id){
                return {...item, visible: value}
            } else {
                return item;
            }
        })
        setFilteredServices(updatedList);
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Template ID</th>
                        <th>Status</th>
                        <th>Created By</th>
                        <th>Cost</th>
                        <th>Associated Service</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredServices?.length === 0 ?
                        <tr>
                            <td colSpan="9">No records found. Try clearing filters</td>
                        </tr> :
                        filteredServices?.sort((a, b) => b.id - a.id).slice(startingItem, startingItem + itemsPerPage).map((service, index) => {
                            return (
                                <tr key={index}>
                                    <td className={styles.id} onClick={
                                        () => { onIdClick(service.id, service.name) }
                                    }>{service.id}</td>
                                    <td onClick={
                                        () => { onIdClick(service.id, service.name) }
                                    }>{service.name}</td>
                                    <td>{service.template}</td>
                                    <td>{service.status}</td>
                                    <td>{service.created_by}</td>
                                    <td>
                                        {["Provisioned", "Approved", "Pending"].includes(service.status) ? service?.total_cost : "-"}
                                    </td>
                                    <td>{service.service}</td>
                                    <td>
                                        {
                                            (() => {
                                                return (
                                                    <div className={styles.icon}
                                                        onClick={() => { setTemplateId(service.id); setVisibility(service.id,true) }}
                                                    >
                                                        <ActionLogo />
                                                        {
                                                            (() => {

                                                                if (service.visible) {
                                                                    return (<ActionItem id={service.id} setVisibility={setVisibility} status={service.status} triggerAction={triggerAction} roles={roles} />)
                                                                } else {
                                                                    return (<></>)
                                                                }
                                                            })()
                                                        }
                                                    </div>
                                                )
                                            })()
                                        }
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
