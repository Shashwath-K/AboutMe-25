import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import HomeMain from './pages/HomeMain';
import ProjectsMain from './pages/ProjectsMain';
import About from './pages/AboutMain';
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
            <Route path="/projects" element={<ProjectsMain />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </LayoutWrapper>
      </Router>
    </>
  );
};

export default App;

