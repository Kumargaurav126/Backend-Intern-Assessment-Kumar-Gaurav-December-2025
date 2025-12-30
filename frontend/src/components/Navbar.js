import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{ 
      padding: '1rem 2rem', 
      background: '#2c3e50', 
      color: 'white', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
    }}>
      <h3 style={{ margin: 0, color: 'white', letterSpacing: '1px', cursor: 'default' }}>
        USER MANAGER
      </h3>

      <div>
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span style={{ fontSize: '0.9rem', color: '#ecf0f1' }}>
              Welcome, 
              <strong style={{ fontFamily: 'Verdana, Geneva, sans-serif', marginLeft: '5px', letterSpacing: '0.5px' }}>
                {user.fullName || 'User'}
              </strong> 
              <span style={{ 
                background: '#34495e', 
                padding: '2px 8px', 
                borderRadius: '4px', 
                marginLeft: '8px',
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                fontFamily: '"Courier New", Courier, monospace',
                letterSpacing: '1px'
              }}>
                {user.role}
              </span>
            </span>

            <Link to="/profile" style={{ color: 'white', textDecoration: 'none' }}>Profile</Link>
            
            {user.role === 'admin' && (
              <Link to="/admin" style={{ color: '#f1c40f', textDecoration: 'none', fontWeight: 'bold' }}>
                Admin Dashboard
              </Link>
            )}

            <button 
              onClick={handleLogout} 
              style={{ 
                padding: '8px 15px', 
                background: '#e74c3c', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px', 
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '15px' }}>
            <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
            <Link to="/signup" style={{ color: 'white', textDecoration: 'none' }}>Signup</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;