import React, { useEffect, useState } from 'react';
import toast from "react-hot-toast";
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import axios from 'axios';
import { Modal } from 'antd';
import CategoryForm from '../../components/Form/CategoryForm';

const AdminCategory = () => {
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState('');

    //Modal
    const [isVisiable, setIsVisible] = useState(false);

    //update
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState('');

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

    const handleCreateCategories = async (e) => {
      e.preventDefault();
      try {
        const {data} = await axios.post('/api/v1/category/create-category', {name: categoryName});
        if(data?.success)
        {
          toast.success(`${categoryName} category Created`);
          handleCategories();
          setCategoryName('');
        }
        else{
            toast.error(data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error('Error in Creating Category');
      }
    }


    
    useEffect(() => {
      handleCategories();
  }, []);

    const handleUpdate = async (e) => {
      e.preventDefault();
      try {
        const {data} = await axios.put(`/api/v1/category/update-category/${selected._id}`, {name: updatedName});
        if(data?.success)
        {
          toast.success(data?.message);
          setIsVisible(false);
          setSelected(null);
          setUpdatedName('')
          handleCategories();
        }
        else
        {
          toast.error('Error in Updating THe Category');
        }
      } catch (error) {
        console.log(error);
        toast.error("Error in Updating Category");
      }
    }

    const handleDeleteFunction =  async (_id) => {
      try {
        const {data} = await axios.delete(`/api/v1/category/delete-category/${_id}`);
        if(data?.success)
        {
          toast.success(data?.message);
          handleCategories();
        }
        else{
          toast.error('Error in Deleting Category');
        }
      } catch (error) {
        console.log(error);
        toast.error('Error in Deleting Category');
      }
    }

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
                <div className='p-3'>
                  <CategoryForm 
                  handleSubmit={handleCreateCategories} 
                  value={categoryName} 
                  setValue={setCategoryName} />
                </div>
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
                                    <div>
                                    <td><button className='btn btn-primary ms-1' onClick={() => {setIsVisible(true); setUpdatedName(category.name); setSelected(category)}}>Edit</button></td>
                                    <td><button className='btn btn-danger ms-1' onClick={() => handleDeleteFunction(category._id)}>Delete</button></td>
                                    </div>
                                </tr>
                            </>)
                        })}
                  </tbody>
                </table>
                </div>
              </div>
              <Modal onCancel={() => setIsVisible(false)} footer={null} open={isVisiable}>
                <CategoryForm handleSubmit={handleUpdate} value={updatedName} setValue={setUpdatedName} />
              </Modal>
            </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default AdminCategory