import { getCookie } from "cookies-next";
import styles from "./Metrics.module.css";
import Layout from "../../components/ui/Layout/Layout";

export default function Metrics(props) {
    return (
        <Layout username={props.username} roles={props.roles}>
            <div className={styles.metricCharts}>
                <div className={styles.chart}>
                    <iframe src="https://snapshots.raintank.io/dashboard-solo/snapshot/LC4gl6DBx1Vd6XyeEMqu8poa8zb2TblC?orgId=0&from=1715171242062&to=1715776042062&theme=light&panelId=9" width="100%" height="300" frameBorder="0"></iframe>
                </div>
                <div className={styles.chart}>
                    <iframe src="https://snapshots.raintank.io/dashboard-solo/snapshot/LC4gl6DBx1Vd6XyeEMqu8poa8zb2TblC?orgId=0&from=1715171242062&to=1715776042062&theme=light&panelId=7" width="100%" height="300" frameBorder="0"></iframe>
                </div>
                <div className={styles.chart}>
                    <iframe src="https://snapshots.raintank.io/dashboard-solo/snapshot/LC4gl6DBx1Vd6XyeEMqu8poa8zb2TblC?orgId=0&from=1715171242062&to=1715776042062&theme=light&panelId=17" width="100%" height="300" frameBorder="0"></iframe>
                </div>
                <div className={styles.chart}>
                    <iframe src="https://snapshots.raintank.io/dashboard-solo/snapshot/LC4gl6DBx1Vd6XyeEMqu8poa8zb2TblC?orgId=0&from=1715171242062&to=1715776042062&theme=light&panelId=16" width="100%" height="300" frameBorder="0"></iframe>
                </div>
                <div className={styles.chart}>
                    <iframe src="https://snapshots.raintank.io/dashboard-solo/snapshot/LC4gl6DBx1Vd6XyeEMqu8poa8zb2TblC?orgId=0&from=1715171242062&to=1715776042062&theme=light&panelId=27" width="100%" height="300" frameBorder="0"></iframe>
                </div>
                <div className={styles.chart}>
                    <iframe src="https://snapshots.raintank.io/dashboard-solo/snapshot/LC4gl6DBx1Vd6XyeEMqu8poa8zb2TblC?orgId=0&from=1715171242062&to=1715776042062&theme=light&panelId=24" width="100%" height="300" frameBorder="0"></iframe>
                </div>
            </div>
        </Layout>
    );
}


export async function getServerSideProps(context) {
    const req = context.req;
    const res = context.res;


    var username = getCookie('username', { req, res });
    var roles = getCookie('roles', { req, res });

    if (username == undefined) {
        username = false;
    }
    if (roles == undefined) {
        roles = false
    }

    roles = JSON.parse(roles);

    return {
        props: { username, roles }
    }
};