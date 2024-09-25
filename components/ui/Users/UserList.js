import { Checkbox, FormControlLabel } from "@mui/material";
import { DeleteLogo, EditIcon, SuccessIcon } from "./../../icons"
import styles from "./UserTable.module.css"
import { useRouter } from "next/router.js"
import CustomizedToggleSwitch from "../Configurable/ToggleSwitch";
import WrongIcon from "../../icons/wrong";

function UserList(props) {
	const router = useRouter();
	const onIdClick = (id, username) => {
		router.push({
			pathname: `${router.asPath}/update/${id}`,
			query: {
				id: id,
				username: username,
			}
		});
	}

	const handleParentChange = (event) => {
		var tempObjects = { ...props.checkedObject };
		for (let key in tempObjects) {
			tempObjects[key] = event.target.checked;
		}
		props.setCheckedObject(tempObjects);
	};


	function convertDate(timeStamp) {
		var utcSeconds = 1234567890;
		var d = new Date(0);
		d.setUTCSeconds(utcSeconds)
		return d.toLocaleString();
	}

	const handleDeleteRow = (id) => {
		props.setUserId(id);
		props.setDeleteClick(true);
	}

	const handleChildChange = (userId) => {
		var tempObjects = { ...props.checkedObject };
		for (let key in tempObjects) {
			if (key === userId) {
				tempObjects[key] = !tempObjects[key];
			}
		}
		props.setCheckedObject(tempObjects)
	}

	const allChecked = () => {
		return Object.values(props.checkedObject).filter((item) => item == true).length === Object.keys(props.checkedObject).length;
	}

	const partialChecked = () => {
		const count = Object.values(props.checkedObject).filter((item) => item == true).length;
		return count === 0 || count === Object.keys(props.checkedObject).length ? false : true;
	}

	function padWithZero(number) {
		return number < 10 ? "0" + number : number;
	}
	function convertDate(timeStamp) {
		var d = new Date(timeStamp);
		var day = d.getDate();
		var month = d.getMonth();
		var year = d.getFullYear();

		var hour = d.getHours();
		var minutes = d.getMinutes();
		var seconds = d.getSeconds();

		var amPm = hour >= 12 ? "PM" : "AM";
		hour = hour % 12 === 0 ? 12 : hour % 12;
		return padWithZero(day) + "/" + padWithZero(month) + "/" + padWithZero(year) + " " + padWithZero(hour) + ":" + padWithZero(minutes) + ":" + padWithZero(seconds) + " " + amPm;
	}

	// const creationOfCheckedObject = () => {
	// 	let checkedObject = {};
	// 	props.filteredUsers && props.filteredUsers.map((user, index) => {
	// 		checkedObject[user.id] = false;
	// 	});
	// 	return checkedObject;
	// }

	// const [checkedObject, setCheckedObject] = useState(creationOfCheckedObject());

	return (
		<div>
			{/* {props.filteredUsers && props.filteredUsers.map((user, index) => { return (<span key={index}>{user.username.toString()} {"<==>"} {checkedObject[user.id] === true ? " true " : " false "} <br /></span>) })} */}
			<table>
				<thead>
					<tr>
						{/* <th className="pl-[15px]">
							<FormControlLabel
								control={
									<Checkbox type="checkbox"
										checked={allChecked()}
										indeterminate={partialChecked() === true}
										onChange={handleParentChange}
										style={{
											background: "white", width: "14px", height: "14px", borderRadius: "1px", padding: "0", border: "1px solid white"
										}}
									/>
								}
							/>
						</th> */}
						<th>User Name</th>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Email</th>
						<th>Created On</th>
						{/* <th>Email Verified</th> */}
						{/* <th>Enable/Disable</th> */}
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{props.filteredUsers?.length === 0 ?
						<tr>
							<td colSpan="9">No records found. Try clearing filters</td>
						</tr> :
						props.filteredUsers?.sort((a, b) => b.id - a.id).slice(props.startingItem, props.startingItem + props.itemsPerPage).map((user, index) => {
							return (
								<tr key={user.id}>
									{/* <td className="pl-[15px]">
										<FormControlLabel
											key={user.id}
											control={
												<Checkbox key={user.id}
													checked={props.checkedObject[user.id] === true}
													onChange={() => { handleChildChange(user.id) }}
												/>
											}
										/>
									</td> */}
									<td>{user.username} </td>
									<td>{user.lastName === undefined ? "NA" : user.lastName.length === 0 ? "NA" : user.lastName}</td>
									<td>{user.firstName === undefined ? "NA" : user.firstName.length === 0 ? "NA" : user.firstName}</td>
									<td>{user.email === undefined ? "NA" : user.email.length === 0 ? "NA" : user.email}</td>
									<td>{convertDate(user.createdTimestamp)}</td>
									{/* <td>
										<div className={styles.icons}>
											{user.emailVerified === true ? <SuccessIcon /> : <WrongIcon />}
										</div>
									</td> */}
									{/* <td>
										<div className={styles.icons} onClick={() => { props.setEnableOrDisable([true, user.enabled]) }}>
											<CustomizedToggleSwitch checked={user.enabled} />
										</div>
									</td> */}
									<td className={styles.actions}>
										<div className={styles.icon}
											onClick={() => { props.setUserId(user.id); onIdClick(user.id, user.firstName + " " + user.lastName) }}
										>
											{<EditIcon color="#0C2132" height="17" width="17" />}
										</div>
										<div className={styles.icon}
											onClick={() => { props.setUserId(user.id); props.setDeleteClick(true); handleDeleteRow(user.id) }}
										>
											{<DeleteLogo />}
										</div>
									</td>
								</tr >
							)
						})
					}
					<tr className="h-[30px]"></tr>
				</tbody >
			</table >
		</div >
	);
}

export default UserList;