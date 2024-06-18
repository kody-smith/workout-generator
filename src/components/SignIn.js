import React, { useState } from 'react';
import axios from 'axios';

const SignInPage = () => {
  const [formData, setFormData] = useState({
    client_id: '',
    client_secret: '',
    code: '',
    redirect_uri: 'http://localhost:3000/', // Update with your actual redirect URI
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/oauth/signin', formData);
      // Redirect to existing page after successful sign-in
      window.location.href = response.data.redirect_url;
    } catch (error) {
      console.error('Error signing in:', error);
      // Handle sign-in error
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="client_id">Client ID:</label>
          <input
            type="text"
            id="client_id"
            name="client_id"
            value={formData.client_id}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="client_secret">Client Secret:</label>
          <input
            type="password"
            id="client_secret"
            name="client_secret"
            value={formData.client_secret}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="code">Authorization Code:</label>
          <input
            type="text"
            id="code"
            name="code"
            value={formData.code}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignInPage;
