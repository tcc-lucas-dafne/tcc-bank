import React from 'react';
import './App.css';
import AppRoutes from './routes';
import AppProvider from './context';

function App() {
  return (
    <div className="App">
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </div>
  );
}

export default App;
