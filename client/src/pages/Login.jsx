import React, { useState } from 'react';
import { registerUser, loginUser } from '../api/api'; // Adjust path if needed

const RegisterOrLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(true); // Track if we are registering or logging in

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;
      if (isRegistering) {
        // Attempt to register the user
        response = await registerUser({ username, password });
        console.log('User registered successfully:', response);
        // Ensure response contains token and save to localStorage
        if (response.token) {
          localStorage.setItem('token', response.token);
        } else {
          throw new Error('No token returned from registration');
        }
      } else {
        // Attempt to log in
        response = await loginUser({ username, password });
        console.log('User logged in successfully:', response);
        // Ensure response contains token and save to localStorage
        if (response.token) {
          localStorage.setItem('token', response.token);
        } else {
          throw new Error('No token returned from login');
        }
      }

      // Redirect to shop or another page after successful login/registration
      window.location.href = '/shop'; // Example redirect

    } catch (error) {
      // Handle user already exists during registration and switch to login form
      if (error.response?.status === 400 && error.response?.data?.message === "User already exists") {
        setIsRegistering(false);  // Switch to login form
        const loginResponse = await loginUser({ username, password });
        console.log('User logged in successfully after registration attempt:', loginResponse);
        // Ensure response contains token and save to localStorage
        if (loginResponse.token) {
          localStorage.setItem('token', loginResponse.token);
        } else {
          throw new Error('No token returned after attempting to log in');
        }
      } else {
        setError(error.response?.data?.message || error.message);
      }
    }
  };

  return (
    <section className='login-bg h-screen w-screen flex justify-center items-center'>
      <div className='flex flex-col gap-6 p-6 h-auto w-1/3 rounded-lg shadow-lg outline outline-black bg-white'>
        <form className="flex flex-col gap-6 text-black" onSubmit={handleSubmit}>
          <input
            className="product-input-box-text border p-2 rounded"
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="product-input-box-text border p-2 rounded"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">{isRegistering ? "Register" : "Login"}</button>
        </form>
        {error && <p className='text-gray-800'>{error}</p>}
        <p className='flex gap-6 justify-center items-center text-black'>
          {isRegistering ? "Already have an account?" : "Don't have an account?"}
          <button onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? "Login" : "Register"}
          </button>
        </p>
      </div>
    </section>
  );
};

export default RegisterOrLogin;
