import { getCookie } from 'cookies-next';
import Layout from '../../components/ui/Layout/Layout'
import { useEffect } from "react";

export default function Monitoring(props) {
	useEffect(() => {
		if (typeof window !== 'undefined') {
			sessionStorage.clear()
		}
	}, []);
    
    return (
        <Layout username={props.username} roles={props.roles}>
            <div className="flex flex-row items-center justify-between m-4">
              <label style={{ color: "var(--font-color-black)"}}>Monitoring Page</label>
            </div>
        </Layout>
    );
}


export async function getServerSideProps(context) {
    const req = context.req
    const res = context.res
    var username = getCookie('username', { req, res });
	var roles = getCookie('roles', { req, res });
	var groups = getCookie('groups', { req, res });

    if (username == undefined){
        username = false;
    }
	if(roles == undefined){
		roles = '[]'
	}
	if(groups == undefined){
		groups = '[]'
	}

	roles = JSON.parse(roles);
	groups = JSON.parse(groups);

    return { props: {username, roles, groups} };
};