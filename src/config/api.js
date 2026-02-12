// Fix for API URLs in production
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://bashi-tech-production.up.railway.app' 
  : 'http://localhost:4000';

// Usage in your components:
const response = await fetch(`${API_URL}/api/auth/signup`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  body: JSON.stringify({
    name,
    email,
    password,
    confirmpassword,
  }),
});

export default API_URL;