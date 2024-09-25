import Link from "next/link";
import Image from "next/image";
import styles from "./Nav.module.css";
import NotificationLogo from "./../../../icons/NotificationsLogo.jsx"
import ProfileLogo from "./../../../icons/ProfileLogo.jsx"
import SearchLogo from "./../../../icons/SearchLogo.jsx"
import Logout from "../../../icons/Logout.jsx";
import { useEffect, useRef, useState } from "react";
import { BorderBottom } from "@mui/icons-material";

const Nav = (props) => {
	const [isOpen, setIsOpen] = useState(false);
	const [userName, setUserName] = useState('');
	useEffect(() => {
		props?.username ? setUserName(props?.username) : setUserName("Admin");
	}, [])
	const dropdownRef = useRef(null);

	useEffect(() => {
		function handleClickOutside(event) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div>
			<nav className={styles.nav}>
				<Image
					alt="logo"
					priority
					src="/images/Nav/TcsNavLogo.svg"
					width="120"
					height="50"
					className={styles.image}
					style={{ width: "auto", height: "auto" }}
					loading="eager"
				></Image>
				<div className={styles.headerLabel}>
					<label id="first">PLATFORM</label>
					<label id="second">ENGINEERING</label>
				</div>
				<div className={styles.topnavRight}>
					<ul>
						<li className={`px-[8px] pt-[5px] ${styles.icons} ${styles.notUsingIcons}`}>
							<Link href="/profile">{<NotificationLogo />}</Link>
						</li>
						<li className={`${styles.icons} ${styles.notUsingIcons}`}>
							<Link href="/profile">{<SearchLogo width="23" height="23" color="#000137" />}</Link>
						</li>
						<li className={`${styles.icons} ${styles.profileIcon}`} ref={dropdownRef} onClick={() => setIsOpen(!isOpen)}>
							<div>
								{<ProfileLogo />}
							</div>
							{
								isOpen && (
									<div className={styles.profile_menu}>
										<ul className={styles.listOptions}>
											<li className={styles.username}>
												{userName[0]?.toUpperCase() + userName?.slice(1,)?.toLowerCase()}
											</li>
											<li onClick={() => window.location.replace("/api/logout")} style={{ cursor: "pointer" }}>
												<Logout />
												<span>Logout</span>
											</li>
										</ul>
									</div>
								)
							}
						</li>
					</ul>
				</div>
			</nav >
		</div >
	)
}

export default Nav
