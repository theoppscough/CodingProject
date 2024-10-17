import React, { useState } from 'react';
import { registerUser } from '../api';

const Register = () => {
    console.log("Register component rendered"); //verify if the component renders
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const { name, email, password } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            //const token = await registerUser(formData);
            //localStorage.setItem('token', token); // Store JWT in localStorage
            // Optionally redirect or display success message
            console.log('Form submitted:', formData);
        } catch (error) {
            console.error('Registration failed:', error); //error.response.data
            //optionally display error message to the user
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <h2>Register</h2>
            <input type="text" name='name' value={name} onChange={onChange} placeholder='Name' required />
            <input type='email' name='email' value={email} onChange={onChange} placeholder='Email' required />
            <input type='password' name='password' value={password} onChange={onChange} placeholder='Password' required />
            <button type='submit'>Register</button>
        </form>
    );
};

export default Register;