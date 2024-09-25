import React, { useEffect, useState } from 'react';
import Nav from './Navbar/Nav';
import Sidebar from './Sidebar/Sidebar';
import Breadcrumb from './Breadcrumb/Breadcrumb';
import styles from './Layout.module.css';
import { Router } from 'next/router';

const Layout = (props) => {
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const startLoading = () => setLoading(true);
		const endLoading = () => setLoading(false);

		Router.events.on('routeChangeStart', startLoading);
		Router.events.on('routeChangeComplete', endLoading);
		Router.events.on('routeChangeError', endLoading);

		return () => {
			Router.events.off('routeChangeStart', startLoading);
			Router.events.off('routeChangeComplete', endLoading);
			Router.events.off('routeChangeError', endLoading);
		};
	}, []);

	return (
		<div className={styles.container}>
			<Nav username={props.username} />
			<div className={styles.mainContainer}>
				<Sidebar username={props.username} roles={props.roles} className={styles.sidebarContainer} />
				<div className={styles.subContainer}>
					<Breadcrumb className={styles.breadCrumb} />
					{
						loading ? (
							<div style={{ display: "flex", flexWrap: "nowrap", color: "black", margin: "10% 0 0 0", fontSize: "1.5rem", fontWeight: "bold" }}>
								<div style={{ paddingTop: "5px" }}>Loading....</div>
								<div className={styles.loader}></div>
							</div>
						) : (
							props.children
						)
					}
				</div>
			</div>
		</div>
	);
};

export default Layout;
