import React, { useEffect, useState } from 'react';
// import { useAuth } from '../../components/context/authContext';
import toast from "react-hot-toast";
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import axios from 'axios';

const AdminCategory = () => {
    const [categories, setCategories] = useState([]);
    // const [auth] = useAuth();

    const handleCategories = async () => {
        try{
            const {data} = await axios.get('/api/v1/category/all-categories');
            if(data.success)
            {
                setCategories(data.allCategories);
                toast.success(data.message);
            }
            else{
                toast.error('Error in FEtching Data');
            }
        }catch(error)
        {
            console.log(error);
            toast.error('Error in Getting Categories');
        }
    }

    useEffect(() => {
        handleCategories();
    }, [])

  return (
    <Layout>
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-3'>
                    <AdminMenu />
                </div>
                <div className='col-md-9'>
                <div className='col-md-9'>
              <div className='card w-75 p-3'>
                <h3>Manage Category</h3>
                <div className='w-75'>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                        {categories?.map((category) => {
                            return (<>
                                <tr>
                                    <td key={category._id}>{category.name}</td>
                                    <td><button className='btn btn-primary'>Edit</button></td>
                                </tr>
                            </>)
                        })}
                  </tbody>
                </table>
                </div>
              </div>
            </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default AdminCategory