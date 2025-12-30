import { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signup = () => {
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '', confirmPassword: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords don't match");
    }
    
    try {
      await API.post('/auth/signup', formData);
      toast.success('Account created! Please login.');
      navigate('/login');
    } catch (err) {
      const msg = err.response?.data?.errors ? err.response.data.errors[0].msg : err.response?.data?.message;
      toast.error(msg || 'Signup failed');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Full Name" required onChange={(e) => setFormData({...formData, fullName: e.target.value})} style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }}/>
        <input type="email" placeholder="Email" required onChange={(e) => setFormData({...formData, email: e.target.value})} style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }}/>
        <input type="password" placeholder="Password (min 6 chars)" required onChange={(e) => setFormData({...formData, password: e.target.value})} style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }}/>
        <input type="password" placeholder="Confirm Password" required onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }}/>
        <button type="submit" style={{ width: '100%', padding: '10px' }}>Register</button>
      </form>
    </div>
  );
};

export default Signup;