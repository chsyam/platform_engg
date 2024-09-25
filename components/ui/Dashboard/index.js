import styles from "./DashboardStyles.module.css"
import PlatformAdminCharts from "./PlatformAdminCharts";
import ProjectAdminCharts from "./ProjectAdminCharts";

const Home = ({ services, username, roles, groups, token }) => {
    return (
        <div className={styles.chartsBody}>
            {
                roles?.includes("platform-admin") && (
                    <PlatformAdminCharts services={services} username={username} roles={roles} groups={groups} token={token} />
                )
            }
            {
                roles?.includes("project-admin") && !roles?.includes("platform-admin") && (
                    <ProjectAdminCharts services={services} groups={groups} token={token} />
                )
            }
        </div>
    );
}

export default Home;