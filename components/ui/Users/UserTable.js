import * as React from 'react';
import UsersMenu from './UsersMenu';
import UserList from "./UserList"
import { useState, useEffect } from "react";
import styles from "./UserTable.module.css"
import PaginationRounded from './PaginationRounded';
import DeletePopup from './deletePopup';
import EnableDisablePopup from './Enable_Disable_Popup';
import DeleteStatus from './deleteStatus';

export default function ColumnTypesGrid({ users, groups }) {
	const [itemsPerPage, setItemsPerPage] = useState(5);
	const [currentPage, setCurrentPage] = useState(1);
	const [startingItem, setStartingItem] = useState((currentPage - 1) * itemsPerPage);
	const [totalPages, setTotalPages] = useState(Math.ceil(users.length / itemsPerPage));
	const [filteredUsers, setFilteredUsers] = useState(users);
	const [deleteClick, setDeleteClick] = useState(false);
	const [enableOrDisable, setEnableOrDisable] = useState([false, false]);
	const [open, setOpen] = useState(false);
	const [userId, setUserId] = useState(0);
	const [deleteStatus, setDeleteStatus] = useState(false);

	useEffect(() => {
		if (groups.length === 0) {
			setFilteredUsers(users);
		} else {
			var temp = []
			users && users.map((user) => {
				user?.groups.includes(groups[0]) && temp.push(user);
			});
			setFilteredUsers(temp);
		}
	}, [users])

	const creationOfCheckedObject = () => {
		let checkedObject = {};
		filteredUsers && filteredUsers.map((user, index) => {
			checkedObject[user.id] = false;
		});
		return checkedObject;
	}

	const [checkedObject, setCheckedObject] = useState(creationOfCheckedObject());

	return (
		<div>
			<div className={`${(deleteClick || enableOrDisable[0] || deleteStatus) && "opacity-10 pointer-events-none"} `}>
				<div className={styles.templates}>
					<UsersMenu
						setFilteredUsers={setFilteredUsers} itemsPerPage={setItemsPerPage}
						setStartingItem={setStartingItem} users={users} setTotalPages={setTotalPages}
						checkedObject={checkedObject} setCheckedObject={setCheckedObject}
					/>
					<UserList
						setCurrentPage={setCurrentPage} filteredUsers={filteredUsers}
						startingItem={startingItem} setStartingItem={setStartingItem}
						itemsPerPage={itemsPerPage} setUserId={setUserId}
						setEnableOrDisable={setEnableOrDisable} setDeleteClick={setDeleteClick}
						checkedObject={checkedObject} setCheckedObject={setCheckedObject}
					/>
					<div className={styles.pagenation}>
						<PaginationRounded
							setCurrentPage={setCurrentPage} totalPages={Math.ceil(filteredUsers?.length / itemsPerPage)}
							itemsPerPage={itemsPerPage} startingItem={startingItem} setStartingItem={setStartingItem}
						/>
					</div>
				</div>
			</div>
			{
				(deleteClick) && (
					<DeletePopup setDeleteClick={setDeleteClick} setOpen={setOpen} userId={userId} users={users} setDeleteStatus={setDeleteStatus} />
				)
			}
			{
				(enableOrDisable[0]) && (
					<EnableDisablePopup enableOrDisable={enableOrDisable} setEnableOrDisable={setEnableOrDisable} setOpen={setOpen} userId={userId} />
				)
			}
			{
				(deleteStatus) && (
					<DeleteStatus setDeleteStatus={setDeleteStatus} />
				)
			}
		</div>
	);
}