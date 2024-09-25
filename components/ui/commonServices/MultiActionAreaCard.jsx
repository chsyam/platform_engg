import styles from './Services.module.css';
import GitHub  from './../../icons/Github';
import Helm from "./../../icons/Helm"
import { useEffect, useState } from 'react';

export default function MultiActionAreaCard(props) {
	const [deployStatus, setDeployStatus] = useState(false);
	const [isDeploying, setIsDeploying] = useState(false);

	const handleDeploy = async (serviceName) => {
		setIsDeploying(true);
		try {
			const response = await fetch("http://10.63.17.1:30390/"+serviceName, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			console.log(response,response.ok);
			alert("Service Deployed Successfully");
		} catch (error) {
			console.log(error);
			alert("Error while deploying service. Please try again later");
		}
		setIsDeploying(false);
	}

	return (
	    <div className={styles.card}>
	        <div>
	         	<div className={styles.title}>
	            	{props.title}
				</div>
				<div style={{backgroundColor:props.bgColor}} className={styles.status}>
					{props.status}
				</div>
				<div className={styles.description}>
					<div className={styles.descText}>
						{props.description}
					</div>
	          	</div>
	        </div>
			<div className={styles.footer}>
				<div
					className={styles.endpoint}
					onClick={() => window.open(props.endpoint, "_blank")}>
		          	API Details
				</div>
				<div className={styles.endpoint} style={{cursor:isDeploying? "not-allowed":"pointer"}} onClick={() => handleDeploy(props.url)}>
					{isDeploying ? "Deploying...":"Deploy"}
				</div>
				<div className={styles.endpoint}
					style={{padding:"0"}}
					onClick={() => window.open(props.helmEndpoint, "_blank")}>
					<Helm width='30' height='30'/>
				</div>
				<div className={styles.endpoint}
					style={{padding:"0px",background:"none"}}
					onClick={() => window.open(props.gitEndpoint, "_blank")}>
					<GitHub width='32' height='32'/>
				</div>
			</div>
	    </div>
	);
}