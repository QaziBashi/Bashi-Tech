// Add to your production backend (Node.js server.js or equivalent)
const cors = require('cors');

app.use(cors({
  origin: ['http://localhost:3000', 'https://bashi-tech-production.up.railway.app'], // Allow both local and production
  credentials: true, // Allow cookies/auth headers
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});