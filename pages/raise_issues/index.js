import { useEffect, useState } from "react";
import Layout from "../../components/ui/Layout/Layout"
import styles from "./Jira.module.css"
import { getCookie } from "cookies-next";

export default function Jira({ jiraIssues, username, roles }) {
    const [statusType, setStatusType] = useState("In Progress");
    const [issueType, setIssueType] = useState("Bug");
    const [issueList, setIssueList] = useState([]);

    const getFullDate = (timeStamp) => {
        if (timeStamp === null || timeStamp === undefined || !timeStamp)
            return ""
        let newDate = new Date(timeStamp);
        return newDate.getDate() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getFullYear();
    }

    useEffect(() => {
        setIssueList(jiraIssues?.filter(issue => (
            issue?.fields?.status?.name?.toLowerCase() == statusType?.toLowerCase()
            &&
            issue?.fields?.issuetype?.name?.toLowerCase() === issueType?.toLowerCase()
        )));
    }, [statusType, issueType, jiraIssues]);

    return (
        <Layout username={username} roles={roles}>
            <div className={styles.issuesSection}>
                <div className={styles.menu}>
                    <div className={styles.issueType}>
                        <label>Issue Type: </label>
                        <select onChange={(e) => { setIssueType(e.target.value) }}>
                            <option value="Bug">Bug</option>
                            <option value="Task">Task</option>
                        </select>
                    </div>
                    <div className={styles.statusType}>
                        <label>Status: </label>
                        <select onChange={(e) => { setStatusType(e.target.value); }}>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>
                    <div className={styles.raiseIssue} onClick={() => {
                        window.open("https://abhishek-v.atlassian.net/jira/software/projects/PLATFORMEN/boards/3", "_blank")
                    }}>
                        Raise an Issue
                    </div>
                </div>
                <table className={styles.issuesTable} style={{ textAlign: "left" }}>
                    <thead>
                        <tr>
                            <th>Summary</th>
                            <th>Assigned To</th>
                            <th>Reported Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            issueList.length === 0 ?
                                <tr style={{ textAlign: "center" }}>
                                    <td colSpan="4">No Records Found...!</td>
                                </tr>
                                :
                                issueList.map(issue => (
                                    <tr key={issue?.id}>
                                        <td>{issue?.fields?.summary}</td>
                                        <td>{issue?.fields?.assignee?.displayName?.replace(".", " ")}</td>
                                        <td>{getFullDate(issue?.fields?.created)}</td>
                                        <td>{issue?.fields?.status?.name}</td>
                                    </tr>
                                ))
                        }
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const req = context.req;
    const res = context.res;
    var username = getCookie('username', { req, res });

    if (!username) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            }
        }
    }
    var roles = getCookie('roles', { req, res });
    var groups = getCookie('groups', { req, res });

    if (username === undefined) {
        username = false;
    }
    if (roles === undefined) {
        roles = false;
    }
    if (groups === undefined) {
        groups = false;
    }
    try {
        const jiraIssues = await fetch('http://10.63.17.1:30130/api/issue/all', {
            method: 'GET'
        });

        console.log("Getting issues", jiraIssues);

        return {
            props: {
                jiraIssues: await jiraIssues.json(),
                username: username,
                roles: roles,
                groups: groups
            }
        }
    } catch (e) {
        console.log("Not getting any issues");
        return {
            props: {
                jiraIssues: [],
                username: username,
                roles: roles,
                groups: groups
            },
        };
    }
}