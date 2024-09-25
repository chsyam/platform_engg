import ServicesByTeamChart from "./ServicesByTeamChart";
import UsersByTeamChart from "./UsersByTeamChart";
import styles from "./DashboardStyles.module.css"
import { useEffect, useState } from "react";
import { getAllUsersLatest } from "../../../pages/api/user_management/getAllUsersLatest";
import TeamBudget from "./TeamBudget";
import PendingRequestsChart from "./PendingRequestsChart";

export default function ProjectAdminCharts({ services, groups, token }) {
    const [usersList, setUsersList] = useState([]);
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await getAllUsersLatest(token);
                const data = await response;
                if (!data) {
                    setUsersList([]);
                } else {
                    setUsersList(data);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUserData();
    }, []);

    return (
        <div>
            <div className={styles.dashboard}>
                <div className={styles.item}>
                    <ServicesByTeamChart services={services} groups={groups} />
                </div>
                <div className={styles.item}>
                    <UsersByTeamChart groups={groups} usersList={usersList} />
                </div>
                <div className={styles.item}>
                    <TeamBudget groups={groups} />
                </div>
                <div className={styles.item}>
                    <PendingRequestsChart groups={groups} services={services} />
                </div>
            </div>
        </div>
    );
}