import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import TableComponent from './components/TableComponent';
import NavigationBar from './components/NavigationBar';
import "./App.css"
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div>
      <NavigationBar />
      {isLoggedIn ? (
        <TableComponent />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
