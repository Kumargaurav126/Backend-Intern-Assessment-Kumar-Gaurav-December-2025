import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <h3>
          <Link to="/">USER MANAGER</Link>
        </h3>
      </div>

      <div>
        {user ? (
          <div className="nav-menu">
            <span className="nav-text">
              Welcome, 
              <strong style={{ fontFamily: 'Verdana, Geneva, sans-serif', marginLeft: '5px', letterSpacing: '0.5px' }}>
                {user.fullName || 'User'}
              </strong> 
              <span className="nav-role">
                {user.role}
              </span>
            </span>

            <Link to="/profile" className="nav-link">Profile</Link>
            
            {user.role === 'admin' && (
              <Link to="/admin" className="nav-link-admin">
                Admin Dashboard
              </Link>
            )}

            <button onClick={handleLogout} className="nav-btn-logout">
              Logout
            </button>
          </div>
        ) : (
          <div className="nav-menu">
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/signup" className="nav-link">Signup</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;