import { Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Navigation from './components/Navigation';

const AppRoutes = () => {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  )
}

export default AppRoutes;