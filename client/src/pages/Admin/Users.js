import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import toast from "react-hot-toast";
import axios from 'axios';

const Users = () => {
    const [user, setUser] = useState([]);

    const handleUsers = async () => {
        try {
            const {data} = await axios.get('/api/v1/auth/all-users');
            if(data.success)
            {
                setUser(data.allUsers);
                toast.success(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Error in Fetching Users');
        }
    }

    useEffect(() => {handleUsers()}, []);
  return (
    <Layout>
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-3'>
                    <AdminMenu />
                </div>
                <div className='col-md-9'>
                {user.map((e) => {
                    return(<>
                        <div class="card m-1 " style={{width: "18rem;"}}>
                  <div className="card-body">
                  <h5 className="card-title">{e.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{e.email}</h6>
                  <h6 className="card-subtitle mb-2 text-muted">{e.phone}</h6>
                  <p className="card-text">{e.address}</p>
                </div>
                </div>
                    </>)
                })}
            </div>
        </div>
        </div>
    </Layout>
  )
}

export default Users