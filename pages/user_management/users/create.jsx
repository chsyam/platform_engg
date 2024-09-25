import Layout from '../../../components/ui/Layout/Layout'
import { getCookie, getCookies } from 'cookies-next';
import style from '../../../styles/users/create.module.css'
import Dropdown from '../../../components/ui/Configurable/DropDown';
import { useState } from 'react';
import ApiResponse from '../../../components/ui/Configurable/ApiResponse';
import axios from 'axios';
import { useRouter } from 'next/router';
import MultiDropDown from '../../../components/ui/Configurable/MultiDropDown';
export default function AddUsersPage( {username,roles} ) {

    const [apiRes, setApiRes] = useState({ type: 0, msg: '' });
    const [isPasswordOpen , togglePasswordOpen] = useState(false);
    const teamOptions = ['Orion', 'Sirius', 'Vega'];
    const [teams, setTeams] = useState([]);
    const roleOptions = ['Admin', 'Developer', 'User'];
    const [role, setRole] = useState([]);
    const router = useRouter();

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
        console.log("body of form is ",body)
        try {
            const response = await axios.post('/api/user_management/users/create', body);
            console.log("respinse is ",response)
            if (response.status === 200) {
                const data = response.data;
                setApiRes({ type: 1, msg: data.message });
                console.log("data is ", data)
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
        router.push(`/user_management/users`);
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
                            <label>Create User</label>
                        </div>
                    </div>
                    {/* First row */}
                    <div className={style.row}>
                        <div className={style.cell}>
                            <label>First Name</label>
                            <input
                                minLength="3"
                                name="firstname"
                                id="firstName"
                                type="text"
                                placeholder="Enter First Name"
                            />
                        </div>
                        <div className={style.cell}>
                            <label>Last Name</label>
                            <input
                                minLength="3"
                                name="lastname"
                                id="lastName"
                                type="text"
                                placeholder="Enter Last Name"
                            />
                        </div>
                    </div>

                    {/* Second row */}
                    <div className={style.row}>
                        <div className={style.cell}>
                            <label>UserName</label>
                            <input
                                minLength="3"
                                name="username"
                                id="userName"
                                type="text"
                                placeholder="Enter User Name"
                            />
                        </div>
                        <div className={style.cell}>
                            <label>User Group</label>
                            <div className={style.dropdown}>
                                <MultiDropDown
                                    options={teamOptions}
                                    values={teams}
                                    setValues={setTeams}
                                    defaultValue="Select a Team"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Third Row */}
                    <div className={style.row}>
                        <div className={style.cell}>
                            <label>Email ID</label>
                            <input
                                minLength="3"
                                name="email"
                                id="email"
                                type="text"
                                placeholder="abc@tcs.com"
                            />
                        </div>
                        <div className={style.cell}>
                            <label>Role</label>
                            <div className={style.dropdown}>
                                <MultiDropDown
                                    options={roleOptions}
                                    values={role}
                                    setValues={setRole}
                                    defaultValue="Select a Role"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Forth Row */}
                    <div className={style.row}>
                        <div className={style.cell}>
                            <label>Password</label>
                            <input
                                minLength="3"
                                name="password"
                                id="password"
                                type="text"
                                placeholder="******"
                            />
                        </div>
                        <div className={style.cell}>
                        </div>
                    </div>

                    <div className={style.buttonsSection}>
                        <button type="submit">Create New User</button>
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
    var roles = getCookie('roles', { req, res });
    if (roles == undefined){
        roles = false;
    }
    if (username == undefined){
        username = false;
    }
    return { props: {username,roles} };
};