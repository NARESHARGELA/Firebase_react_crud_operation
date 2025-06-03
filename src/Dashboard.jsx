import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Firebase CRUD Dashboard</h1>
      <div style={styles.linkContainer}>
        <Link to="/write" style={styles.link}>➕ Write Data</Link>
        <Link to="/read" style={styles.link}>📖 Read Data</Link>
        <Link to="/update" style={styles.link}>✏️ Update Data</Link>
        <Link to="/delete" style={styles.link}>❌ Delete Data</Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '40px',
    fontFamily: 'Arial',
  },
  header: {
    fontSize: '2rem',
    marginBottom: '20px',
  },
  linkContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    alignItems: 'center',
  },
  link: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '8px',
    width: '200px',
    textAlign: 'center',
    fontSize: '16px',
  }
};

export default Dashboard;
