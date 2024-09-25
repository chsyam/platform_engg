import { getCookie } from "cookies-next";
import Layout from "./../../components/ui/Layout/Layout"
import MultiActionAreaCard from "./../../components/ui/commonServices/MultiActionAreaCard";
import styles from "./../../components/ui/commonServices/Services.module.css";

export default function Services(props){
    const services_list = [
        {
            title: "Caching",
            description: "Caching is the process of storing copies of files in a cache, or temporary storage location, so that they can be accessed more quickly.",
            endpoint:"http://10.63.17.158:30981/swagger-ui/index.html",
            gitEndpoint:"http://10.63.32.87/platformengineering/microservices/-/tree/redis-caching",
            helmEndpoint:"http://10.63.32.87/platformengineering/microservices/-/blob/helm_charts/redis-caching-chart-0.1.0.tgz",
            status: "Ready for applications use",
            bgColor: "#d5f0dd",
            url: "caching"
        },
        {
            title: "Logging",
            description: "the efk(elasticsearch , fluentd, kibana) stack aggregates logs from hosts and applications which can be visualized in Kibana.",
            endpoint:"http://10.63.17.158:30998/swagger-ui.html",
            gitEndpoint:"http://10.63.32.87/platformengineering/microservices/-/tree/efk-logging",
            helmEndpoint:"http://10.63.32.87/platformengineering/microservices/-/blob/helm_charts/efk-chart-0.1.0.tgz",
            status: "Ready for applications use",
            bgColor: "#d5f0dd",
            url: "logging"
        },
        {
            title: "Messaging",
            description: "Messaging is a distributed streaming platform that enables the publishing and subscribing of messages in real-time.",
            endpoint:"http://10.63.17.158:30803/swagger-ui.html",
            gitEndpoint:"http://10.63.32.87/platformengineering/microservices/-/tree/messaging-kafka",
            helmEndpoint:"http://10.63.32.87/platformengineering/microservices/-/blob/helm_charts/kafka-msg-chart-0.1.0.tgz",
            status: "Ready for applications use",
            bgColor: "#d5f0dd",
            url: "messaging"
        },
        {
            title:"Secret Management",
            description:"Secret management is a practice that allows developers to securely store sensitive data such as passwords and tokens, in a secure environment",
            endpoint:"http://10.63.17.158:30999/swagger-ui.html",
            gitEndpoint:"http://10.63.32.87/platformengineering/microservices/-/tree/secret-management",
            helmEndpoint:"http://10.63.32.87/platformengineering/microservices/-/blob/helm_charts/vault-chart-0.1.0.tgz",
            status:"Ready for applications use",
            bgColor: "#d5f0dd",
            url:"secret-management"
        },
        {
            title:"Encryption-Decryption",
            description:"Encyption and Decryption allows us to securely transfer data from one source to another source",
            endpoint:"http://10.63.17.158:30905/swagger-ui.html",
            gitEndpoint:"http://10.63.32.87/platformengineering/microservices/-/tree/enc-dec",
            helmEndpoint:"http://10.63.32.87/platformengineering/microservices/-/blob/helm_charts/encryption-chart-0.1.0.tgz",
            status:"Ready for applications use",
            bgColor: "#d5f0dd",
            url:"encryption-decryption"
        },
        {
            title:"License Management",
            description:"License Management is a service that generates unique license keys for software, facilitating controlled access and usage based on authorized permissions and terms.",
            endpoint:"http://10.63.17.158:30298/swagger-ui.html",
            gitEndpoint:"http://10.63.32.87/platformengineering/microservices/-/tree/licence-management",
            helmEndpoint:"",
            status:"Ready for applications use",
            bgColor: "#d5f0dd",
            url:"license-management"
        },
        {
            title:"Alarm Management",
            description:"Alarm Management is a service that centralizes the storage of alarms originating from various sources and of different severity levels.",
            endpoint:"",
            gitEndpoint:"",
            helmEndpoint:"",
            status:"Ready for applications use",
            bgColor: "#d5f0dd",
            url:"alarm-management"
        },
        {
            title:"Distributed Tracing",
            description:"Tracing in microservices is the process of monitoring and tracking the flow of requests across different services to analyze and optimize system performance.",
            endpoint:"http://10.63.32.133:16686/",
            gitEndpoint:"",
            helmEndpoint:"",
            status:"Ready for applications use",
            bgColor: "#d5f0dd",
            url:"distributed-tracing"
        },
        {
            title:"Policy Engine",
            description:"A policy engine is a software component that enforces rules or policies within a system or application.",
            endpoint:"",
            gitEndpoint:"",
            helmEndpoint:"",
            status:"Development In-progress",
            bgColor: "#D3F7FF",
            url: "policy-engine"
        },
        {
            title:"Metrics Engine",
            description:"A metrics engine is a tool that collects and analyzes data to generate performance indicators and insights, aiding in decision-making and optimization processes. ",
            endpoint:"",
            gitEndpoint:"",
            helmEndpoint:"",
            status:"Development In-progress",
            bgColor: "#D3F7FF",
            url:"metrics-engine"
        },
        {
            title:"Backup and Restore",
            description:"Backup and restore is a data management process where copies of important files or systems are made to protect against data loss. ",
            endpoint:"",
            gitEndpoint:"",
            helmEndpoint:"",
            status:"Ideation",
            bgColor: "#DAE0E2",
            url:"backup-restore"
        },
        {
            title:"Notification",
            description:"Notifications are alerts or messages sent to users to inform them about relevant events, updates, or actions within a system or application. ",
            endpoint:"",
            gitEndpoint:"",
            helmEndpoint:"",
            status:"Ideation",
            bgColor: "#DAE0E2",
            url:"notification"
        },
        {
            title:"Configuration Management",
            description:"Configuration Management is the process of systematically handling changes to a system's configuration in a way that maintains integrity over time",
            endpoint:"",
            gitEndpoint:"",
            helmEndpoint:"",
            status:"Ideation",
            bgColor: "#DAE0E2",
            url:"configuration-management"
        },
        {
            title:"Workflow Engine",
            description:"A workflow engine is a software tool that automates and manages the flow of tasks, data, and processes within an organization, streamlining operations and improving efficiency.",
            endpoint:"",
            gitEndpoint:"",
            helmEndpoint:"",
            status:"Ideation",
            bgColor:"#DAE0E2",
            url:"workflow-engine"
        }
    ]

    return (
        <Layout username={props.username} roles={props.roles}>
            <div className={styles.card_section}>
                {
                    services_list.map((service, index) => { 
                        return (
                            <div key={index}>
                                <MultiActionAreaCard 
                                    key={index} 
                                    title={service.title} 
                                    description={service.description}
                                    endpoint={service.endpoint}
                                    gitEndpoint={service.gitEndpoint}
                                    helmEndpoint={service.helmEndpoint}
                                    status={service.status}
                                    bgColor={service.bgColor}
                                    url={service.url}
                                />
                            </div>
                        )
                    }
                )}
            </div>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const req = context.req;
    const res = context.res;

    
    var username = getCookie('username', { req, res });
	  var roles = getCookie('roles', { req, res });
	  var groups = getCookie('groups', { req, res });

    if (username == undefined){
        username = false;
    }
	if(roles == undefined){
		roles = false
	}
	if(groups == undefined){
		groups = false
	}

	roles = JSON.parse(roles);
	groups = JSON.parse(groups);

    return {
      props: {username, roles, groups}
    }
};