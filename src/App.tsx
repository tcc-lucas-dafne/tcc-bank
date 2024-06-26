import React from 'react';
import './App.css';
import AppRoutes from './routes';
import AppProvider from './context';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <AppProvider>
        <AppRoutes />
        <ToastContainer />
      </AppProvider>
    </div>
  );
}

export default App;
