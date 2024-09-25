import { getCookie } from 'cookies-next';
import Layout from '../../../components/ui/Layout/Layout';
import UserTable from '../../../components/ui/Users/UserTable'
import { getAllUsers } from '../../api/user_management';
import styles from "./../../../styles/users/index.module.css";

export default function Users( props ) {
    return (
        <Layout username={props.username} roles = {props.roles}>
            <div className={`${styles.ListContainer}`}>
              <UserTable users={props.users} groups={props.groups}></UserTable>
            </div>
        </Layout>
    );
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
		groups = false
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