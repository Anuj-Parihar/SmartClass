import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './register.css';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    stream: '',
    slot: '',
    registration: ''
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/register', formData);
      alert(res.data.message);
      setFormData({ name: '', email: '', password: '', stream: '', slot: '', registration: '' });
      navigate('/home');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Student Registration</h2>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        
        <select name="stream" value={formData.stream} onChange={handleChange} required>
          <option value="">Select Stream</option>
          <option value="MCA">MCA</option>
          <option value="M.Tech">M.Tech</option>
          <option value="B.Tech">B.Tech</option>
        </select>
        
        <select name="slot" value={formData.slot} onChange={handleChange} required>
          <option value="">Select Slot</option>
          <option value="1">Slot 1</option>
          <option value="2">Slot 2</option>
          <option value="3">Slot 3</option>
          <option value="4">Slot 4</option>
        </select>
        
        <input type="text" name="registration" placeholder="Registration Number" value={formData.registration} onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;