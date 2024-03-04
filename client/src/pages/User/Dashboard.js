import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'

const Dashboard = () => {
  return (
    <Layout title={'Ellite passion-Dashboard'}>
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-3'>
                    <UserMenu />
                </div>
                <div className='col-md-9'>
                    <h2>User Info</h2>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Dashboard