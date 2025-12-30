import { useState, useEffect, useContext } from 'react';
import API from '../api';
import AuthContext from '../context/AuthContext';
import { toast } from 'react-toastify'; 

const Profile = () => {
  const { user } = useContext(AuthContext);
  
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
  
  const [initialData, setInitialData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await API.get('/users/profile');
        const userData = { fullName: data.fullName, email: data.email, password: '' };
        setFormData(userData);
        setInitialData(userData); 
      } catch (err) {
        toast.error('Failed to load profile');
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updates = { 
        fullName: formData.fullName, 
        email: formData.email 
      };
      if (formData.password) updates.password = formData.password;

      await API.put('/users/profile', updates);
      
      toast.success('Profile updated successfully!');
      
      setInitialData({ ...formData, password: '' });
      setFormData(prev => ({ ...prev, password: '' }));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData(initialData); 
    toast.info('Changes cancelled');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h2>My Profile</h2>
      <form onSubmit={handleSubmit}>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Full Name</label>
          <input 
            type="text" 
            value={formData.fullName} 
            onChange={(e) => setFormData({...formData, fullName: e.target.value})} 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Email</label>
          <input 
            type="email" 
            value={formData.email} 
            onChange={(e) => setFormData({...formData, email: e.target.value})} 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>New Password</label>
          <input 
            type="password" 
            placeholder="Leave blank to keep current password"
            value={formData.password} 
            onChange={(e) => setFormData({...formData, password: e.target.value})} 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              padding: '10px 20px', 
              background: '#4CAF50', 
              color: 'white', 
              border: 'none', 
              cursor: 'pointer' 
            }}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
          
          <button 
            type="button" 
            onClick={handleCancel}
            style={{ 
              padding: '10px 20px', 
              background: '#f44336', 
              color: 'white', 
              border: 'none', 
              cursor: 'pointer' 
            }}
          >
            Cancel
          </button>
        </div>

      </form>
    </div>
  );
};

export default Profile;