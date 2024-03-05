import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout';
import { useAuth } from '../components/context/authContext';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Prices } from '../components/Prices';
import { Checkbox, Radio } from 'antd';
import { Link } from 'react-router-dom';

const Home = () => {
  // const [auth, setAuth] = useAuth();
  const [categories, setcategories] = useState([]);
  const [products, setproducts] = useState([]);

  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

  const handleCategories = async () => {
    try {
      const {data} = await axios.get('/api/v1/category/all-categories');
      if(data?.success)
      {
        toast.success(data.message);
        setcategories(data.allCategories);
      }
      else
      {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Error in Getting Categories');
    }
  }

  const AllProducts = async () => {
    try {
      const {data} = await axios.get('/api/v1/product/all-products');
      if(data.success)
      {
        toast.success(data.message);
        setproducts(data.allProducts);
      }
    } catch (error) {
      console.log(error);
      toast.error('Error in Getting the Products');
    }
  }

  const filterProducts = (value, id) => {
    let all = [...checked];

    if(value)
    {
      all.push(id);
    }
    else
    {
      all = all.filter(c => c !== id);
    }
    setChecked(all);
  }

  useEffect(() => {handleCategories()}, []);

  useEffect(() => {
    if(!checked.length || !radio.length)
    {
      AllProducts();
    }
  }, [checked.length, radio.length]);

  useEffect(() => {
    if(checked.length || radio.length)
    {
      handleFilter();
    }
  }, [checked, radio]);

  const handleFilter = async () => {
    try {
      const { data } = await axios.post('/api/v1/product/product-filter', { checked, radio });
      setproducts(data?.products);
    } catch (error) {
      console.log(error);
      toast.error('Cannot apply Filter');
    }
  };


  return (
    <Layout title={'Ellite passion-Best Offers'}>
        <div className='row'>
          <div className='col-md-3'>
            <h2 className='text-center'>Filters</h2>
            <div className='d-flex flex-column'>
              {categories.map((c) => {
                return <Checkbox className='m-1' key={c._id} onChange={(e) => {filterProducts(e.target.checked, c._id)}}>{c.name}</Checkbox>
              })}
            </div>
            <div className='d-flex flex-wrap'>
            {Prices?.map((price) => {
                return <Radio.Group onChange={(e) => {setRadio(e.target.value)}}>
                  <div key={price._id}>
                    <Radio value={price.array}>{price.name}</Radio>
                  </div>
                </Radio.Group>
              })}
            </div>
          </div>
          <div className='col-md-9'>
            <h3 className='text-center'>Products</h3>
            <div className='d-flex flex-wrap'>
            <div className='d-flex flex-wrap'>
              {products.map((p) => {
                return(<>
                  <div className="card m-1" style={{width: '18rem'}} key={p._id}>
                    <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}e</h5>
                      <p className="card-text">{p.description}</p>
                      <p className="card-text">${p.price}</p>
                      <div>
                      <Link to="#" className="btn btn-success ms-1">Order Now</Link>
                      <Link to="#" className="btn btn-warning ms-1">Add To Cart</Link>
                      </div>
                    </div>
                  </div>
                </>)
              })}
            </div>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default Home;