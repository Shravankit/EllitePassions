import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { useNavigate, useLocation } from 'react-router-dom';
import {useAuth} from "../../components/context/authContext";
import axios from 'axios';
import toast from 'react-hot-toast';

const Login = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const location = useLocation();


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/v1/auth/login', {
        email: userEmail,
        password: userPassword,
      });

      if(res.data && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token
        });
        localStorage.setItem('auth', JSON.stringify(res.data));
        setTimeout(() => {
          navigate(location.state ||'/');
        }, 500);
      } else {
        // If response data exists but success is false
        toast.error(res.data.message);
      }
    } catch (error) {
      // Handle errors such as network issues or server errors
      console.log(error);
      toast.error('Error in login. Please try again later.');
    }
  }

  return (
    <Layout title={'Ellite passion-Login'}>
      <div className='form-container'>
        <form onSubmit={handleLogin} >
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={userEmail} onChange={e => setUserEmail(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" value={userPassword} onChange={e => setUserPassword(e.target.value)} autoComplete="current-password" />
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
          </div>
          <div className='mb-3'>
            <button type="submit" className="btn btn-primary" onClick={() => {navigate('/forgot-password')}}>Forgot Password</button>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </Layout>
  )
}

export default Login;
