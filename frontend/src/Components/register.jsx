import React, { useState } from 'react';
import axios from 'axios';
import './register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    stream: '',
    slot: ''
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/register', formData);
      alert(res.data.message);
      setFormData({ name: '', email: '', stream: '', slot: '' });
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
        <input type="password" name="password" placeholder="password" value={formData.password} onChange={handleChange} required />
        <input type="text" name="stream" placeholder="Stream (e.g. CSE)" value={formData.stream} onChange={handleChange} required />
        <input type="text" name="slot" placeholder="Slot (e.g. 1 or 3)" value={formData.slot} onChange={handleChange} required />
        <input type="text" name="registration" placeholder="Registration Number" value={formData.registration} onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
