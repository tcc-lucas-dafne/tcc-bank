import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Navigation from './components/Navigation';
import { useAppContext } from './context';
import Loading from './components/Loading';
import UserUpdate from './pages/UserUpdate';

const AppRoutes = () => {
  const { user } = useAppContext();

  if (user === undefined) {
    return <Loading />;
  };

  const isAuthenticated: boolean = !!user;

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="login" replace />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/user" element={<UserUpdate />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  )
}

export default AppRoutes;