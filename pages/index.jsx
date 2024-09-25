import { useRouter } from 'next/router';
import LayoutLogin from '../components/ui/Layout/Layout_login'
import Layout from '../components/ui/Layout/Layout'
import { getCookie } from 'cookies-next';
import LoginPage from '../pages/login';
import Dashboard from '../components/ui/Dashboard';
import { useEffect } from 'react';
import { getAllServices } from './api/deployments';

export default function HomePage({services, username, roles, groups, token}) {
    const router = useRouter();
    useEffect(() => {
        if (username && roles?.includes("developer") && !roles.includes("platform-admin") && !roles?.includes("project-admin")
        ) {
            router.push("/deployments");
        }
    })
    
    return (
        <LayoutLogin pageTitle="Home">
        {username ?
        <>
            <Layout username={username} roles={roles} groups={groups}>
                <Dashboard services={ services}  username={username} roles={roles} groups={groups} token={token} />
            </Layout>
        </>:
        <>
            <LoginPage></LoginPage>
        </>
        }
        </LayoutLogin>
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
    var token = getCookie('access-token',{req,res})
    
    if (username == undefined){
        username = false;
    }
    if (roles == undefined){
        roles = [];
    }
    if (groups == undefined){
        groups = [];
    }
    if(token == undefined){
        token = "";
    }
    
    try {
        roles = JSON.parse(roles);
        let services = await getAllServices(username, roles, groups);
        if(!services || services instanceof Error){
            services = []
        }
        
        return {
            props: {
                services: services,
                username:username,
                roles:roles,
                groups:groups,
                token:token
            }
        };
      } catch (error) {
        console.error('Error fetching data:', error);
        return {
            props: {
                services: [],
                username,
                roles,
                groups,
                token
            },
        };
    }
};