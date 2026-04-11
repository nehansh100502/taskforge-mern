import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const doLogout = async () => {
      const user = JSON.parse(localStorage.getItem('userInfo'));

      try {
        await fetch('http://localhost:8000/api/auth/logout', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });

        // ✅ Success toast
        toast.success('Logged out successfully');

      } catch (err) {
        console.error(err);

        // ❌ Error toast
        toast.error('Logout failed');
      }

      logout();

      // ⏳ Small delay so toast is visible
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    };

    doLogout();
  }, []);

  return <p className="text-center mt-10">Logging out...</p>;
};

export default Logout;