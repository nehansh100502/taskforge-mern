import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const doLogout = async () => {
      const token = localStorage.getItem('tf_token');
      try {
        await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/auth/logout`, {
          method: 'DELETE',
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        toast.success('Logged out successfully');
      } catch (err) {
        console.error(err);
        toast.error('Logout failed');
      }

      logout();

      setTimeout(() => {
        navigate('/login');
      }, 800);
    };

    doLogout();
  }, [logout, navigate]);

  return <p className="text-center mt-10">Logging out...</p>;
};

export default Logout;