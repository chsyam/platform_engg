import LayoutLogin from '../../../../components/ui/Layout/Layout_login'
import Layout from '../../../../components/ui/Layout/Layout'
import LoginPage from '../../../index';
import { getCookie } from 'cookies-next';
import style from '../../../../styles/users/update.module.css'
import Dropdown from '../../../../components/ui/Configurable/DropDown/index';
import { useState } from 'react';
import ApiResponse from '../../../../components/ui/Configurable/ApiResponse/index';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function UpdateUsersPage( {username,roles,token} ) {

    const router = useRouter();
    const { id } = router.query;
    const [apiRes, setApiRes] = useState({ type: 0, msg: '' });
    const [isPasswordOpen , togglePasswordOpen] = useState(false);
    const teamOptions = ['Orion', 'Sirius', 'Vega'];
    const [team, setTeam] = useState(null);

    const handleDropdownSelect = (option) => {
        setSelectedOption(option);
    };
    const handlePasswordEye = () => {
        togglePasswordOpen(!isPasswordOpen);
    }
    
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log("form clicked ")
        const formData = new FormData(event.target);
        const body = {};
        formData.forEach((value, key) => {
            body[key] = value
        });
        body["token"] = token;
       
        console.log("form data is ",body)
        try {
            const response = await axios.post('/api/user_management/users/update', body);
            console.log("respinse is ",response)
            if (response.status === 200) {
                const data = response.data;
                setApiRes({ type: 1, msg: data.message });
            } else {
                const data = response.data;
                setApiRes({ type: -1, msg: data.message });
            }
        } catch (error) {
            const errorMessage = error.response.data.message || 'Internal Server Error';
            setApiRes({ type: -1, msg: errorMessage });
        }
    };

    const handleContinue = () => {
        router.push("/user_management/users/");
    }

    return (
        <Layout username={username} roles={roles}>
            <div className={style.container}>
            {
                apiRes.type !== 0 && <ApiResponse apiRes={apiRes} setApiRes={setApiRes} onContinue={handleContinue} />
            }
            <div className={`${style.mainContainer} ${(apiRes.type !== 0) ? 'opacity-0 pointer-events-none' : ''}`}>
                <form  className={style.form} onSubmit={handleFormSubmit}>
                    <div className={style.headings} style={{marginTop: "24px"}}>
                        <div id="label">
                            <label>Update User</label>
                        </div>
                    </div>
                    <div className={style.row}>
                    <div className={style.cell}>
                        <label>User ID *</label>
                        <input
                            minLength="3"
                            name="id"
                            id="id"
                            type="text"
                            value={`${id}`}
                            readOnly
                        />
                    </div>
                    <div className={style.cell}>
                        <label>User Team</label>
                        <div className={style.dropdown}>
                            <Dropdown
                                options={teamOptions}
                                selectedOption={team}
                                defaultValue="Select a Team"
                                onSelect={setTeam}
                            />
                        </div>
                    </div>
                </div>

                <div className={style.row}>
                    <div className={style.cell}>
                        <label>First Name</label>
                        <input
                            minLength="3"
                            name="firstName"
                            id="firstname"
                            type="text"
                            placeholder="Enter First Name"
                        />
                    </div>
                    <div className={style.cell}>
                        <label>LastName</label>
                        <input
                            minLength="3"
                            name="lastName"
                            id="lastname"
                            type="text"
                            placeholder="Enter LastName"
                        />
                    </div>
                </div>

                <div className={style.row}>
                    <div className={style.cell}>
                        <label>Email-Id</label>
                        <input
                            minLength="3"
                            name="email"
                            id="email"
                            type="text"
                            placeholder="Enter Email Id"
                        />
                    </div>
                    <div className={style.cell}>

                    </div>
                </div>

                      
                    <div className={style.buttonsSection}>
                        <button type="submit">Update User</button>
                    </div>
                </form> 
            </div>
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
    var token = getCookie('access-token', { req, res });
    var roles = getCookie('roles', { req, res });
    if (roles == undefined){
        roles = false;
    }
    if (username == undefined){
        username = false;
    }
    return { props: {username, roles, token: token } };
};
