import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import HomeMain from './pages/HomeMain';
const LayoutWrapper = ({ children }) => {
  return (
    <main>
      {children}
    </main>
  );
};

const App = () => {
  return (
    <>
      <Router>
        <LayoutWrapper>
          <Routes>
            <Route path="/" element={<HomeMain />} />
          </Routes>
        </LayoutWrapper>
      </Router>
    </>
  );
};

export default App;

