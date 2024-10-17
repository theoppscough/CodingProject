import React, { useState } from 'react';
import { loginUser } from '../api';

const Login = () => {
    const[formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = await loginUser(formData);
            localStorage.setItem('token', token); //Store JWT in localStorage
            //Optionally redirect or display success message
        } catch (error) {
            console.error('Login failed:' , error.response.data);
            //Optionally display error message to the user
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <h2>Login</h2>
            <input type='email' name='email' value={email} onChange={onChange} placeholder='Email' required />
            <input type='password' name='password' value={password} onChange={onChange} placeholder='Password' required />
            <button type='submit'>Login</button>        
        </form>
    );
};

export default Login;