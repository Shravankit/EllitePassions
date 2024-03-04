import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import toast from 'react-hot-toast';
import axios from 'axios';

const AdminProduct = () => {
    const [products, setProducts] = useState([]);

    const handlePeoducts = async () => {
        try {
            const {data} = await axios.get('/api/v1/product/all-products');
            if(data.success)
            {
                setProducts(data.allProducts);
                toast.success(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Error in Getting Products')
        }
    }


    useEffect(() => {handlePeoducts()}, []);
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
                <h3>Manage Products</h3>
                <div className='w-75'>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope='col'>Description</th>
                      <th scope='col'>Category</th>
                      <th scope='col'>Price</th>
                      <th scope='col'>quantity</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                        {products?.map((e) => {
                            return (<>
                                <tr>
                                    <td key={e._id}>{e.name}</td>
                                    <td>{e.description}</td>
                                    <td>{e.category.name}</td>
                                    <td>{e.price}</td>
                                    <td>{e.quantity}</td>
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

export default AdminProduct