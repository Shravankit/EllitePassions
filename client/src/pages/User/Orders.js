import React from 'react';
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';

const Orders = () => {
  return (
    <Layout title={'Ellite PAssions Users Orders'}>
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-3'>
                    <UserMenu />
                </div>
                <div className='col-md-9'>
                    Orders
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Orders