import { useEffect, useState } from "react";
import styles from "./DashboardStyles.module.css"

export default function PendingRequestsChart({ services, groups }) {
    const [pendingList, setPendingList] = useState([])
    useEffect(() => {
        setPendingList(services.filter(service => service.status === "Pending"))
    }, [services])

    return (
        <div className={styles.pendingList}>
            <div className={styles.cardHeader}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className={styles.chartHead}>
                        Pending Requests
                    </div>
                </div>
            </div>
            {
                (pendingList.length === 0) ? (
                    <div style={{ color: "#0C2132", fontSize: "16px", display: "flex", alignItems: "middle", justifyContent: "center" }}>
                        No Pending Requests
                    </div>
                ) : (
                    <div className={styles.pendingListBody}>
                        <table style={{ width: "90%", margin: "auto", color: "#000" }}>
                            <thead>
                                <tr style={{ color: "#0C2132" }}>
                                    <th>Id</th>
                                    <th>Service</th>
                                    <th>Created By</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    pendingList.map(service => (
                                        <tr>
                                            <td>{service.id}</td>
                                            <td>{service.name}</td>
                                            <td>{service.created_by}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                )
            }
        </div>
    );
}