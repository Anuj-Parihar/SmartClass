import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './mailingStatus.css';

const MailingStatus = () => {
  const [status, setStatus] = useState('Loading...');
  const [lastChecked, setLastChecked] = useState('');

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/mail/status');
        setStatus(res.data.message);
        setLastChecked(new Date().toLocaleTimeString());
      } catch (err) {
        setStatus('Error fetching status');
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mailing-status-container">
      <h2>Mailing System Status</h2>
      <div className="status-card">
        <div className="status-indicator active"></div>
        <p className="status-message">{status}</p>
        <p className="last-checked">Last checked: {lastChecked}</p>
      </div>
    </div>
  );
};

export default MailingStatus;