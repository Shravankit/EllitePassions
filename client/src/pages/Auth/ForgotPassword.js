import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [answer, setAnswer] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/forget-password', {
                email: email,
                newPassword: newPassword,
                answer: answer,
            });

            if(res.data && res.data.success)
            {
                toast.success('Succesfully Created New Password');
                setInterval(() => {
                    navigate('/login');
                }, 500);
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to create New Password');
        }
    }

  return (
    <Layout title={'Ellite Passions Forgot Password'}>
        <div className='form-container'>
        <form onSubmit={handleSubmit} >
          <div className="mb-3">
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={e => setEmail(e.target.value)} placeholder='your Email' />
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={answer} onChange={e => setAnswer(e.target.value)} placeholder='Your Lucky Number' />
          </div>
          <div className="mb-3">
            <input type="password" className="form-control" id="exampleInputPassword1" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder='Your New Password' />
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </Layout>
  )
}

export default ForgotPassword