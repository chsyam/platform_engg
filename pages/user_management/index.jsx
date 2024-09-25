import Layout from '../../components/ui/Layout/Layout'
import { FaRegUser, FaUsers, FaCodepen } from "react-icons/fa";
import { useRouter } from "next/router";
import { useState } from 'react';
import styles from "./../../styles/users/index.module.css";
import LayoutLogin from '../../components/ui/Layout/Layout_login';
import ApiResponse from '../../components/ui/Configurable/ApiResponse';
import LoginPage from '../login';
import { getCookie } from 'cookies-next';
import UserTable from "./../../components/ui/Users/UserTable";
import { getAllUsers } from '../api/user_management';

export default function Users(props) {
	const [popUp, setPopUp] = useState({ type: 0, msg: '' });
	const router = useRouter();
	const handleForword = () => {
		//alert(props.roles);
		//const isAdmin = props.roles?.includes("platform-admin");
		router.push(`${router.asPath}/users`);
		/*if(isAdmin){
			router.push(`${router.asPath}/users`);
		}
		else{
			setPopUp({type: -1, msg: "Only Platform Admins are allowed"})
		}*/
	}

	const LayoutContent = ({ username, roles, users }) => {
		return (
			roles?.includes("platform-admin") ?
				(
					<Layout username={username} roles={roles}>
				{
					popUp.type !== 0 && <ApiResponse apiRes={popUp} setApiRes={setPopUp} onContinue={() => { }} />
				}
				<div className={`${popUp.type !== 0 && "opacity-0 pointer-events-none"}`}>
					<div className={styles.cardSection}>
						<div className={styles.card}
							onClick={handleForword}
						>
							<div className={styles.icon}>
								<div className={styles.sec}>
									<FaRegUser />
								</div>
							</div>
							<div className={styles.desc}>Users</div>
						</div>
						<div className={styles.card}>
							<div className={styles.icon}>
								<div className={styles.sec}>
									<FaUsers />
								</div>
							</div>
							<div className={styles.desc}>Groups</div>
						</div>
					</div >
				</div>
			</Layout>
		) : (
			<Layout username={props.username} roles={props.roles}>
						<div className={`${styles.ListContainer} `}>
					<UserTable users={props.users} groups={props.groups}></UserTable>
				</div>
			</Layout>
		));
	}

	return(
		<LayoutLogin pageTitle="User Management">
			{ props.username ?
				<LayoutContent username={props.username} roles={props.roles}/>
				: 
				<LoginPage />
			}
		</LayoutLogin>
	)
}

export async function getServerSideProps(context) {
    const req = context.req
    const res = context.res
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

	
    if (username == undefined){
        username = false;
    }
	if(roles == undefined){
		roles = false
	}
	if(groups == undefined){
		groups = []
	}
	try {	
		roles = JSON.parse(roles);
		groups = JSON.parse(groups);
		let users = await getAllUsers(req, res);
		if(!users || users instanceof Error){
            users = []
		}
		return {
            props: {
                users: users,
                username,
                roles,
                groups,
            },
        };
	} catch (error) {
		console.error('Error fetching data:', error);
        return {
            props: {
                users: [],
                username,
                roles,
                groups,
            },
        };
	}
};