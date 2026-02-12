# CORS Fix for Railway
require("dotenv").config();

app.use(cors({
  origin: ['https://bashi-tech-production.up.railway.app', 'http://localhost:3000', 'https://localhost:4000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Origin'],
}));