import Layout from '../../components/Layout/Layout';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminMenu from '../../components/Layout/AdminMenu';
import toast from 'react-hot-toast';
import axios from 'axios';

const Products = () => {
    const [products, setProducts] = useState([]);

    //handle all products
    const handleAllProducts = async () => {
        try {
            const {data} = await axios.get('/api/v1/product/all-products');
            if(data?.success)
            {
                toast.success(data.message);
                setProducts(data.allProducts);
            }
            else
            {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Error in Fetching Products");
        }
    }

    useEffect(() => {handleAllProducts()}, [])
  return (
    <Layout title={'Ellite Passions Products'}>
        <div className='row'>
            <div className='col-md-3'>
                <AdminMenu />
            </div>
            <div className='col-md-9'>
                <h1 className='text-center'>All Products</h1>
                <div className='d-flex flex-wrap'>
                    {products?.map((p) => {
                       return <Link
                          key={p._id}
                          to={`/dashboard/admin/product/${p.slug}`}
                          className="product-link"
                        >
                        <div className="card" style={{width: '18rem'}}>
                          <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} width={'2rem'} />
                          <div className="card-body">
                            <h5 className="card-title">{p.name}</h5>
                            <p className="card-text">{p.description.substring(0, 30)}</p>
                            <p className="card-text">{p.price}</p>
                          </div>
                        </div>
                    </Link>
                    })}
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Products
