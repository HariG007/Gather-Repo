import React from 'react';
import { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import { useUpdateUserMutation } from '../../slices/usersApiSlice';
import { setCredentials } from '../../slices/authSlice';
import { Link } from 'react-router-dom';

export default function RegisterForm() {
   
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  
    const dispatch = useDispatch();
  
    const { userInfo } = useSelector((state) => state.auth);
  
    const [updateProfile, { isLoading }] = useUpdateUserMutation();
  
    useEffect(() => {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }, [userInfo.email, userInfo.name]);
  
    const submitHandler = async (e) => {
      e.preventDefault();
      if (password !== confirmPassword) {
        toast.error('Passwords do not match');
      } else {
        try {
          const res = await updateProfile({
            _id: userInfo._id,
            name,
            email,
            password,
          }).unwrap();
          console.log(res);
          dispatch(setCredentials(res));
          toast.success('Profile updated successfully');
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      }
    };
      return (
   <>
   <div style={{height:'600px'}}>
      
   <form  onSubmit={submitHandler} className="form">
   <div style={{width:'100px',height:'100px',borderRadius:'50px',backgroundSize:'cover',backgroundImage:'url(data:image/jpeg;base64,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)',backgroundPosition:'center',backgroundRepeat:'no-repeat',marginLeft:'150px',outlineColor:'darkblue',outlineWidth:'2px',outlineStyle:'solid'}}></div>

   <div className="flex-column">
    <label> Your Name </label>
  </div>
  <div className="inputForm" >
    <input  value={name}  controlId='name'  onChange={(e) => setName(e.target.value)} type="name" className="input" placeholder="Name" />
  </div>

  <div className="flex-column">
    <label>Your Email </label>
  </div>
  <div className="inputForm" >
    <input  value={email}  controlId='email' onChange={(e) => setEmail(e.target.value)} type="email" className="input" placeholder="Enter your Email" />
  </div>

  <div className="flex-column">
    <label>Update Password </label>
  </div>
  <div className="inputForm">
    <svg
      height={20}
      viewBox="-64 0 512 512"
      width={20}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0" />
      <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0" />
    </svg>
    <input
     controlId='password'
      type="password"
      className="input"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Enter your Password"
    />
    <svg viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg">
      <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
    </svg>
  </div>

  <div className="flex-column">
    <label>Confirm Password </label>
  </div>
  <div className="inputForm">
    <svg
      height={20}
      viewBox="-64 0 512 512"
      width={20}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0" />
      <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0" />
    </svg>
    <input
     controlId='confirmPassword'
      type="password"
      className="input"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      placeholder="Confirm Password"
    />
    <svg viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg">
      <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
    </svg>
  </div>

  
  <button className="button-submit" style={{backgroundColor:'darkblue'}}  type='submit'>Save</button>
 
  
  
{isLoading && <Loader />}
</form>
</div>
   </>
  )
}
