import React from 'react';
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';


const Profile = () => {
  return (
    <Layout title={'Ellite Passions Users Profile'}>
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-3'>
                    <UserMenu />
                </div>
                <div className='col-md-9'>
                    Profile
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Profile