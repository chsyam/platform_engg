import Jenkins from "../../icons/Jenkins";
import styles from "./DashboardStyles.module.css"

function JenkinsDashboard() {
    return (
        <div className={styles.JenkinsDashboard}>
            <div className={styles.chartHead}>Jenkins Dashboard <Jenkins /></div>
            <div className={styles.description}>
                Jenkins is an open-source automation server that facilitates continuous integration and continuous delivery (CI/CD) in software development.
            </div>
            <div onClick={() => window.open("http://10.63.20.74:32002/grafana/d/W8AiDFQnk/jenkins?orgId=1", "_blank")}>
                <div className={styles.button}>Dashboard</div>
            </div>
        </div>
    )
}

export default JenkinsDashboard;