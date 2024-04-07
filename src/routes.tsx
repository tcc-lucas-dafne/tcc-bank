import { Routes, Route } from 'react-router-dom';

import Login from './pages/Login';

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default AppRoutes;