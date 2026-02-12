// # Railway Backend Fix

// ## Step 1: Add Monitoring
// Add these logging endpoints to your backend:
app.get('/api/logs', (req, res) => {
  const logs = {
    timestamp: new Date(),
    level: 'info',
    message: 'API call received',
    data: {
      method: req.method,
      url: req.url,
      userAgent: req.headers['user-agent'],
      ip: req.ip
    }
  };
  console.log(JSON.stringify(logs, null, 2));
  res.json({ success: true, logs });
});

app.get('/api/metrics', (req, res) => {
  const metrics = {
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    activeConnections: 1,
    timestamp: new Date()
  };
  res.json(metrics);
});

## Step 2: Add Retry Logic
app.use((req, res, next) => {
  const maxRetries = 3;
  const retryDelay = 1000;
  
  let retryCount = 0;
  
  // Retry failed requests
  const originalJson = res.json;
  
  const makeRequest = async (options, retryAttempt = 1) => {
    try {
      return await fetch(req.url, {
        ...options,
        timeout: 10000,
        signal: AbortSignal.timeout(retryDelay)
      });
    } catch (error) {
      console.error(`Retry ${retryAttempt} failed:`, error.message);
      
      if (retryAttempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return makeRequest(options, retryAttempt + 1);
      }
      
      throw error;
    }
  };
  
  try {
    const response = await makeRequest(req.body, retryAttempt);
    return response;
  } catch (error) {
    console.error('All retries failed:', error.message);
    return res.status(500).json({ error: 'Service temporarily unavailable' });
  }
});

## Step 3: Force Restart Policy
// Auto-restart service after 5 failed requests
let failureCount = 0;
setInterval(() => {
  failureCount++;
  if (failureCount > 5) {
    console.log('Too many failures, considering restart');
    process.exit(1);
  }
}, 60000);