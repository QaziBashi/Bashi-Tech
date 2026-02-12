# Railway Status Check Commands

## 1. Check Current Deployment
```bash
railway status
```

## 2. Check Service Logs
```bash
railway logs
```

## 3. Check Recent Deployments
```bash
railway list
```

## 4. Test Backend Directly
```bash
# Test if backend server responds directly
curl https://your-backend-name.up.railway.app/api/ping
```

## 5. Restart Service
```bash
railway restart
```

## 6. Redeploy
```bash
git push origin main
railway deploy
```

## What to Check:
- Service status: Active, building, crashed, or down
- Response times: Are API calls responding?
- Error logs: Any error messages in logs
- Deployment: Latest successful deployment

## If Backend is Down:
1. Check if auto-deployment enabled
2. Manual deployment needed
3. Consider platform reliability (Railway vs Vercel)

Run these commands and share the output to identify the exact issue!