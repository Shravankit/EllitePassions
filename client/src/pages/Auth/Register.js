import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
// import { response } from 'express';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState();
    const [phone, setPhone] = useState('');
    const [answer, setAnswer] = useState('');
    const [address, setAddress] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/register', {
                name,
                email,
                password,
                phone,
                answer,
                address,
            })

            if(res.data && res.data.success)
            {
                toast.success('Registration Succesful');
                navigate('/login');
            }
            else
            {
                toast.error('Registration failed');
            }

        } catch (error) {
            console.log(error);
            toast.error("Error in submition");
        }
    }
  
    return (
    <Layout title={'Ellite passion-Register'}>
        <div className='form-container'>
        <h1>Register Page</h1>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Your Name' value={name} onChange={e => setName(e.target.value)} />
             </div>
            <div className="mb-3">
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Your Email' value={email} onChange={e => setEmail(e.target.value)} />              
            </div>
            <div className="mb-3">
              <input type="password" className="form-control" id="exampleInputPassword1" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password"/>
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Your Phone Number' value={phone} onChange={e => setPhone(e.target.value)} />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Your Lucky Number' value={answer} onChange={e => setAnswer(e.target.value)} />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Your Address' value={address} onChange={e => setAddress(e.target.value)} />
            </div>
            <div className="mb-3 form-check">
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>

        </div>
    </Layout>
  )
}

export default Register