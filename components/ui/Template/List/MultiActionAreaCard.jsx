import * as React from 'react';
import styles from './TemplateTable.module.css';
import { MdArrowOutward } from "react-icons/md";
import { DeleteLogo, EditIcon } from '../../../icons';
import { useRouter } from 'next/router';

export default function MultiActionAreaCard(props) {
	const router = useRouter();

	const handleEditClick = (id, templateName) => {
		router.push({
			pathname: `${router.asPath}/${id}`,
			query: {
				templateName: templateName,
				edit: true,
			}
		});
	}

	const handleDeployClick = (id, templateName) => {
		router.push({
			pathname: `${router.asPath}/${id}`,
			query: {
				templateName: templateName,
				deploy: true,
			}
		});
	}

	return (
	    <div className={styles.card}>
	        <div>
	         	<div className={styles.title}>
	            	{props.title}
	          	</div>
	          	<div className={styles.description}>
					<div style={{ display: "flex",gap:"5px",marginBottom:"10px" }}>
						<div style={{fontSize:"13px",color:"gray",whiteSpace:"nowrap"}}>Type:</div>
						<div className={styles.descriptionValue}>{props.type}</div>
					</div>
					<div style={{ display: "flex",gap:"5px",marginBottom:"10px" }}>
						<div style={{fontSize:"13px",color:"gray",whiteSpace:"nowrap"}}>Created On:</div>
						<div className={styles.descriptionValue}>{props.createdOn}</div>
					</div>
					<div style={{ display: "flex",gap:"5px",marginBottom:"10px" }}>
						<div style={{fontSize:"13px",color:"gray",whiteSpace:"nowrap"}}>Created By:</div>
						<div className={styles.descriptionValue}>{props.createdBy}</div>
					</div>
	          	</div>
	        </div>
			<div style={{display:"flex",justifyContent:"space-between"}} className={styles.footer}>
				<div style={{ background: "linear-gradient(90deg, #0C2132 -1.34%, #174D95 100.46%)", padding: "5px", borderRadius: "5px" }}
					onClick={() => { handleDeployClick(props.id, props.title) }}
				>
		          	Deploy
				</div>
				{
					props.isDeveloper && (
						<div onClick={() => { handleEditClick(props.id, props.title) }}>
	                    	<EditIcon color="#000137" width="19" height="19" />
						</div>
					)
				}
				{
					props.isDeveloper && (
						<div onClick={() => { props.setTemplateId(props.id); props.setDeleteClick(true) }}>
							{<DeleteLogo color="#000137" width="19" height="19" />}
						</div>
					)
				}
			</div>
	    </div>
	);
}