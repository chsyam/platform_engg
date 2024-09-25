import LayoutLogin from '../../components/ui/Layout/Layout_login'
import Layout from '../../components/ui/Layout/Layout'
import LoginPage from '../login';
import { getCookie } from 'cookies-next';
// import style from '../../styles/forms.module.css'
// import Button from '../../components/ui/Configurable/Button/index'
// import Dropdown from '../../components/ui/Configurable/DropDown/index';
import { useState } from 'react';
// import ApiResponse from '../../components/ui/Configurable/ApiResponse/index';
import axios from 'axios';
// import Tree from '../../components/ui/Configurable/Tree/index';
import { format } from 'date-fns';
// import FormResponse from '../../components/ui/Configurable/FormResponse';

export default function createTemplate( {username,roles} ) {

    const [apiRes, setApiRes] = useState({ type: 0, msg: '' });
    const [isPasswordOpen , togglePasswordOpen] = useState(false);
    const versionOptions = ['1.0', '2.0', '3.0'];
    const [version, setVersion] = useState(null);
    const teamOptions = ['Developer Team', 'Marketing Team', 'Designers Team'];
    const [team, setTeam] = useState(null);
    const currentDate = new Date();
    const formattedDate = format(currentDate, 'dd-MM-yyyy');

    const handlePasswordEye = () => {
        togglePasswordOpen(!isPasswordOpen);
    }
      
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const body = {};
        formData.forEach((value, key) => {
            body[key] = value
        });
        try {
            const response = await axios.post('/api/templates/create', body);
            if (response.status === 200) {
                const data = response.data;
                setApiRes({ type: 1, msg: data.message });
            } else {
                const data = response.data;
                setApiRes({ type: -1, msg: data.message });
            }
        } catch (error) {
            console.error('An error occurred:', error);
            setApiRes({ type: -1, msg: 'Exception in processing form data' });
        }
    };


return (
<LayoutLogin pageTitle="Deploy Template">
    {username ?
    <><Layout username={username} roles = {roles}>
        <h1>Hellow WOrld</h1>
    </Layout>
    </>: 
    <><LoginPage></LoginPage></>
}
</LayoutLogin>);
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
    if(roles == undefined){
        roles = false;
    }
    if (username == undefined){
        username = false;
    }
    return { props: {username,roles} };
};