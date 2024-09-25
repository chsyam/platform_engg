import { useEffect, useState } from "react";
import AlertsChart from "./AlertsChart";
import BudgetChart from "./Budget";
import CpuUtilization from "./CpuUtilization";
import styles from "./DashboardStyles.module.css"
import JenkinsDashboard from "./JenkinsDashboard";
import ServicesChart from "./ServicesChart";
import UsersChart from "./UsersChart";
import { getAllUsersLatest } from "../../../pages/api/user_management/getAllUsersLatest";
import BudgetbyGrpChart from "./BudgetbyGrpChart";

export default function PlatformAdminCharts({ services, username, token, groups, roles }) {
    const [enlarge, setEnlarge] = useState(false);
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
    }, [enlarge]);

    return (
        <div>
            {
                !enlarge ? (
                    <div className={styles.dashboard}>
                        <div className={`${styles.item}`}>
                            <CpuUtilization setEnlarge={setEnlarge} enlarge={enlarge} />
                        </div>
                        <div className={`${styles.item}`}>
                            <AlertsChart />
                        </div>
                        <div className={`${styles.item}`}>
                            <ServicesChart services={services} username={username} roles={roles} groups={groups} />
                        </div>
                        <div className={`${styles.item}`}>
                            <UsersChart usersList={usersList} />
                        </div>
                        <div className={`${styles.item}`}>
                            <BudgetChart />
                        </div>
                        <div className={styles.item}>
                            <BudgetbyGrpChart />
                        </div>
                    </div>
                ) : (
                    <div className={styles.enlargeDashboard}>
                        <div className={styles.chartEnlarge}>
                            <CpuUtilization setEnlarge={setEnlarge} enlarge={enlarge} />
                        </div>
                    </div>
                )
            }
        </div>
    );
}