import React, { useContext, useEffect, useState } from 'react';
import Login from './components/Auth/Login';
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import { getAdminCredentials, getLocalStorage } from './utils/localStorage';
import { AuthContext } from './context/AuthProvider';

const App = () => {
  const [user, setUser] = useState(null);
  const [loggedInUserData, setLoggedInUserData] = useState(null);
  const [userData] = useContext(AuthContext); // Global employee data context

  // Load login state on first render
  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      try {
        const userData = JSON.parse(loggedInUser);
        if (userData?.role === 'admin' || userData?.role === 'employee') {
          setUser(userData.role);
          setLoggedInUserData(userData.data || null);
        } else {
          localStorage.removeItem('loggedInUser');
        }
      } catch {
        localStorage.removeItem('loggedInUser');
      }
    }
  }, []);

  // When employee data changes in context, keep dashboard state in sync
  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser && userData) {
      const parsed = JSON.parse(loggedInUser);
      if (parsed.role === 'employee') {
        const updated = userData.find(emp => emp.firstName === parsed.data.firstName);
        if (updated) {
          setLoggedInUserData(updated);
          localStorage.setItem(
            'loggedInUser',
            JSON.stringify({ role: 'employee', data: updated })
          );
        }
      }
    }
  }, [userData]);

  const handleLogin = (email, password) => {
    const { adminEmail, adminPassword } = getAdminCredentials();
    const { employees } = getLocalStorage();

    if (email === adminEmail && password === adminPassword) {
      setUser('admin');
      localStorage.setItem('loggedInUser', JSON.stringify({ role: 'admin' }));
    } else {
      const employee = employees.find(
        (e) => e.email === email && e.password === password
      );
      if (employee) {
        setUser('employee');
        setLoggedInUserData(employee);
        localStorage.setItem(
          'loggedInUser',
          JSON.stringify({ role: 'employee', data: employee })
        );
      } else {
        alert('Invalid Credentials');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setUser(null);
    setLoggedInUserData(null);
  };

  return (
    <>
      {!user && <Login handleLogin={handleLogin} />}
      {user === 'admin' && <AdminDashboard changeUser={handleLogout} />}
      {user === 'employee' && (
        <EmployeeDashboard changeUser={handleLogout} data={loggedInUserData} />
      )}
    </>
  );
};

export default App;