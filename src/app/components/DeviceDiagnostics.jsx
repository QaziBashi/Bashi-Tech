"use client";
import { useState, useEffect } from 'react';

const DeviceDiagnostics = () => {
  const [deviceInfo, setDeviceInfo] = useState(null);
  const [networkStatus, setNetworkStatus] = useState('checking');

  useEffect(() => {
    // Device detection
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTablet = /iPad|Android(?!.*Mobile)|Tablet/i.test(navigator.userAgent);
    const isDesktop = !isMobile && !isTablet;
    
    // Network check
    const checkNetwork = async () => {
      try {
        const response = await fetch('https://bashi-tech-production.up.railway.app/api/ping', { 
          method: 'GET',
          timeout: 5000 
        });
        setNetworkStatus(response.ok ? 'online' : 'offline');
      } catch (error) {
        setNetworkStatus('error');
      }
    };

    setDeviceInfo({
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      screenResolution: `${window.screen?.width}x${window.screen?.height}`,
      colorDepth: window.screen?.colorDepth,
      pixelRatio: window.devicePixelRatio,
      cookies: navigator.cookieEnabled,
      localstorage: typeof Storage !== 'undefined',
      sessionstorage: typeof sessionStorage !== 'undefined',
      connection: navigator.connection ? {
        effectiveType: navigator.connection.effectiveType,
        downlink: navigator.connection.downlink,
        rtt: navigator.connection.rtt
      } : null,
      mobile: isMobile,
      tablet: isTablet,
      desktop: isDesktop
    });

    // Check network immediately
    checkNetwork();
    const interval = setInterval(checkNetwork, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace', fontSize: '12px' }}>
      <h3>🔍 Device Diagnostics</h3>
      <div style={{ marginBottom: '10px' }}>
        <strong>Network Status:</strong> {networkStatus}
      </div>
      {deviceInfo && (
        <div style={{ marginBottom: '10px' }}>
          <strong>Device:</strong> {deviceInfo.mobile ? 'Mobile' : deviceInfo.tablet ? 'Tablet' : 'Desktop'}
          <br />
          <strong>Platform:</strong> {deviceInfo.platform}
          <br />
          <strong>Screen:</strong> {deviceInfo.screenResolution}
          <br />
          <strong>User Agent:</strong> {deviceInfo.userAgent}
          <br />
          <strong>LocalStorage:</strong> {deviceInfo.localstorage ? '✅ Available' : '❌ Not Available'}
          <br />
          <strong>Connection:</strong> {deviceInfo.connection?.effectiveType || 'Unknown'}
        </div>
      )}
      
      <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
        <p><strong>📱 Mobile Issues:</strong> Touch events not working? Try pinch zoom</p>
        <p><strong>🌐 Network Issues:</strong> Can't access? Check firewall, ISP blocking</p>
        <p><strong>🖥 Browser Issues:</strong> Console errors? Try Chrome/Firefox</p>
        <p><strong>📱 Screen Issues:</strong> Too large/small? Try zoom controls</p>
        <p><strong>🍪 OS Issues:</strong> Different behavior? Check updates</p>
        <p><strong>🔍 Next Steps:</strong></p>
        <ol>
          <li>Share this diagnostic page URL</li>
          <li>Test on multiple devices</li>
          <li>Check browser console for errors</li>
          <li>Verify internet connectivity</li>
        </ol>
      </div>
    </div>
  );
};

export default DeviceDiagnostics;