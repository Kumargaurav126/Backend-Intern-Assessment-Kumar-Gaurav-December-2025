import { useEffect, useState } from 'react';
import API from '../api';
import { toast } from 'react-toastify';
import './Admin.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchUsers = async () => {
    try {
      const { data } = await API.get(`/admin/users?pageNumber=${page}`);
      setUsers(data.users);
      setTotalPages(data.pages);
    } catch (err) {
      toast.error('Failed to load users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const toggleStatus = async (id, currentStatus) => {    
    if(!window.confirm('Are you sure you want to change this user status?')) return;
    
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      await API.put(`/admin/users/${id}/status`, { status: newStatus });
      toast.success(`User marked as ${newStatus}`);
      fetchUsers(); 
    } catch (err) {
      toast.error('Status update failed');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Admin Dashboard</h2>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead style={{ background: '#f4f4f4' }}>
          <tr>
            <th style={{ padding: '10px' }}>Full Name</th>
            <th style={{ padding: '10px' }}>Email</th>
            <th style={{ padding: '10px' }}>Role</th>
            <th style={{ padding: '10px' }}>Status</th>
            <th style={{ padding: '10px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id} style={{ textAlign: 'center' }}>
              <td style={{ padding: '10px' }}>{user.fullName}</td>
              <td style={{ padding: '10px' }}>{user.email}</td>
              <td style={{ padding: '10px' }}>{user.role}</td>
              <td style={{ padding: '10px', color: user.status === 'active' ? 'green' : 'red', fontWeight: 'bold' }}>
                {user.status}
              </td>
              <td style={{ padding: '10px' }}>
                <button 
                  onClick={() => toggleStatus(user._id, user.status)}
                  style={{
                    padding: '5px 10px',
                    cursor: 'pointer',
                    background: user.status === 'active' ? '#ff4d4d' : '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px'
                  }}
                >
                  {user.status === 'active' ? 'Deactivate' : 'Activate'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)} style={{ padding: '5px 15px' }}>
          Previous
        </button>
        <span style={{ alignSelf: 'center' }}>Page {page} of {totalPages}</span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)} style={{ padding: '5px 15px' }}>
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;